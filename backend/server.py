from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import io
import logging
import jwt
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta

from resume_pdf import build_resume_pdf


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Inbox auth config
JWT_SECRET = os.environ.get('JWT_SECRET', 'change-me')
JWT_ALG = 'HS256'
INBOX_PASSWORD = os.environ.get('INBOX_PASSWORD', '')

# Create the main app without a prefix
app = FastAPI(title="Enoch Derek Doeblah — Portfolio API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ----------------------------- Models -----------------------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=2, max_length=150)
    message: str = Field(..., min_length=5, max_length=4000)
    # Honeypot field — must be empty for real humans
    company: Optional[str] = Field(default="", max_length=200)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class InboxAuth(BaseModel):
    password: str


# ----------------------------- Auth helpers -----------------------------
def create_inbox_token() -> str:
    payload = {
        "scope": "inbox",
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


async def require_inbox(authorization: Optional[str] = Header(default=None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authentication required")
    token = authorization.split(" ", 1)[1]
    try:
        jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired. Please sign in again.")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid session")
    return True


# ----------------------------- Helpers -----------------------------
def serialize_doc(doc: dict) -> dict:
    """Convert Mongo doc into JSON-serializable dict."""
    out = {}
    for k, v in doc.items():
        if k == "_id":
            continue
        if isinstance(v, datetime):
            out[k] = v.isoformat()
        else:
            out[k] = v
    return out


# ----------------------------- Routes -----------------------------
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact")
async def create_contact_message(payload: ContactMessageCreate):
    # Honeypot: silently accept but discard bot submissions
    if payload.company and payload.company.strip():
        return {"success": True, "id": str(uuid.uuid4())}

    msg = ContactMessage(
        name=payload.name.strip(),
        email=str(payload.email).strip().lower(),
        subject=payload.subject.strip(),
        message=payload.message.strip(),
    )
    doc = msg.model_dump()
    doc['createdAt'] = doc['createdAt'].isoformat()
    try:
        await db.contact_messages.insert_one(doc)
    except Exception as e:
        logger.error(f"Failed to store contact message: {e}")
        raise HTTPException(status_code=500, detail="Could not save your message. Please try again.")

    return {"success": True, "id": msg.id}


@api_router.post("/inbox/auth")
async def inbox_auth(payload: InboxAuth):
    if not INBOX_PASSWORD:
        raise HTTPException(status_code=500, detail="Inbox password is not configured on the server.")
    if payload.password != INBOX_PASSWORD:
        raise HTTPException(status_code=401, detail="Incorrect password")
    return {"token": create_inbox_token()}


@api_router.get("/contact")
async def list_contact_messages(limit: int = 100, _auth: bool = Depends(require_inbox)):
    limit = max(1, min(limit, 500))
    docs = await db.contact_messages.find().sort("createdAt", -1).to_list(limit)
    return [serialize_doc(d) for d in docs]


@api_router.get("/resume/pdf")
async def download_resume_pdf():
    pdf_bytes = build_resume_pdf()
    buffer = io.BytesIO(pdf_bytes)
    headers = {
        "Content-Disposition": 'attachment; filename="Enoch_Derek_Doeblah_Resume.pdf"'
    }
    return StreamingResponse(buffer, media_type="application/pdf", headers=headers)


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
