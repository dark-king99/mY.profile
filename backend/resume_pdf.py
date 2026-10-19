"""Resume PDF generation using ReportLab.

Produces a clean, single-column, recruiter-friendly resume for
Enoch Derek Doeblah.
"""
from io import BytesIO
from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
    Image as RLImage,
)

PHOTO_PATH = Path(__file__).resolve().parent.parent / "frontend" / "public" / "me" / "enoch-headshot.jpg"

# -------- Resume content (single source of truth for the PDF) --------
PROFILE = {
    "name": "Enoch Derek Doeblah",
    "title": "Full-Stack Software Engineer & DevOps Enthusiast",
    "email": "your.email@example.com",
    "linkedin": "linkedin.com/in/your-handle",
    "github": "github.com/your-handle",
    "location": "Remote · Available Worldwide",
}

SUMMARY = (
    "Full-stack software engineer with hands-on experience across the entire product "
    "lifecycle — from designing Python backends and databases to building responsive web "
    "and mobile applications. Comfortable in DevOps and cloud environments, working with "
    "Docker and Kubernetes to ship reliable, production-ready software. Passionate about "
    "clean architecture, automation, and delivering measurable value for remote and "
    "freelance clients."
)

SKILLS = [
    ("Languages", "Python, JavaScript, HTML, CSS, SQL"),
    ("Backend & Data", "Python APIs, Databases, REST, API Integration"),
    ("Frontend", "JavaScript frameworks, Web Apps, Websites, Responsive UI"),
    ("Mobile", "Cross-platform mobile application development"),
    ("DevOps & Cloud", "Docker, Kubernetes, Cloud Computing, CI/CD workflows"),
]

EXPERIENCE = [
    {
        "role": "Software Engineer (Backend)",
        "company": "Digital Liberia INC",
        "period": "Present",
        "points": [
            "Engineered and maintain the Python backend powering the company website (digitalliberia.com).",
            "Design database structures and API endpoints supporting core business features.",
            "Collaborate on delivery of production web software for the organization.",
        ],
    },
]

PROJECTS = [
    {
        "name": "Executive UI — Enterprise Software Suite",
        "meta": "Solo Designer & Engineer · Production-ready",
        "points": [
            "Designed and engineered a high-level enterprise platform unifying Marketing "
            "Automation, CRM, Network Management, a Managerial Workspace, HR & Payroll, "
            "and Messaging/Communication.",
            "Built extensive API integrations to connect enterprise services into one cohesive system.",
            "Delivered a fully production-ready product (deployment pending business arrangements).",
        ],
    },
    {
        "name": "Digital Liberia — Company Website",
        "meta": "Backend Engineer · digitalliberia.com",
        "points": [
            "Built the backend with Python, handling data and server-side application logic.",
            "Supported the delivery of a live, publicly accessible company website.",
        ],
    },
]

CERTIFICATIONS = [
    {
        "name": "Cloud Computing 101 — CC0101EN: Introduction to Cloud Computing",
        "meta": "IBM · edX · Jun 2026",
        "status": "Completed",
        "verify": "https://courses.edx.org/certificates/aad31b04ce734895b87c3b48403171fe",
    },
    {"name": "Python Essentials 1 — PCEP (Certified Entry-Level Python Programmer)", "meta": "Python Institute", "status": "In Progress", "verify": ""},
    {"name": "Python Essentials 2 — PCAP (Certified Associate in Python Programming)", "meta": "Python Institute", "status": "In Progress", "verify": ""},
    {"name": "Backend Development Engineer — Node.js & Express", "meta": "JavaScript / Node.js", "status": "In Progress", "verify": ""},
    {"name": "React.js (Official) & Modern JS Frameworks", "meta": "JavaScript · Web & Software Development", "status": "In Progress", "verify": ""},
    {"name": "Kubernetes Certification", "meta": "", "status": "In Progress", "verify": ""},
    {"name": "Computer Vision Fundamentals", "meta": "Google Cloud", "status": "In Progress", "verify": ""},
    {"name": "Machine Learning Specialization", "meta": "DeepLearning.AI · Stanford Online", "status": "In Progress", "verify": ""},
]


def build_resume_pdf() -> bytes:
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        topMargin=0.6 * inch,
        bottomMargin=0.6 * inch,
        title="Enoch Derek Doeblah — Resume",
        author="Enoch Derek Doeblah",
    )

    accent = colors.HexColor("#0d9488")  # ocean-teal
    dark = colors.HexColor("#0f172a")
    muted = colors.HexColor("#475569")

    styles = getSampleStyleSheet()
    name_style = ParagraphStyle(
        "Name", parent=styles["Title"], fontName="Helvetica-Bold",
        fontSize=22, textColor=dark, spaceAfter=2, leading=26, alignment=TA_LEFT,
    )
    title_style = ParagraphStyle(
        "TitleLine", parent=styles["Normal"], fontName="Helvetica",
        fontSize=11.5, textColor=accent, spaceAfter=4,
    )
    contact_style = ParagraphStyle(
        "Contact", parent=styles["Normal"], fontName="Helvetica",
        fontSize=9, textColor=muted, spaceAfter=2,
    )
    section_style = ParagraphStyle(
        "Section", parent=styles["Heading2"], fontName="Helvetica-Bold",
        fontSize=12, textColor=dark, spaceBefore=12, spaceAfter=4,
    )
    body_style = ParagraphStyle(
        "Body", parent=styles["Normal"], fontName="Helvetica",
        fontSize=9.5, textColor=colors.HexColor("#1e293b"), leading=13.5,
    )
    role_style = ParagraphStyle(
        "Role", parent=styles["Normal"], fontName="Helvetica-Bold",
        fontSize=10.5, textColor=dark, spaceAfter=0,
    )
    meta_style = ParagraphStyle(
        "Meta", parent=styles["Normal"], fontName="Helvetica-Oblique",
        fontSize=9, textColor=muted, spaceAfter=3,
    )
    bullet_style = ParagraphStyle(
        "Bullet", parent=body_style, leftIndent=12, bulletIndent=2, spaceAfter=2,
    )

    story = []

    # Header (name/title/contact on the left, passport photo on the right)
    contact_line = " &nbsp;•&nbsp; ".join([
        PROFILE["email"], PROFILE["linkedin"], PROFILE["github"], PROFILE["location"],
    ])
    left_cell = [
        Paragraph(PROFILE["name"], name_style),
        Paragraph(PROFILE["title"], title_style),
        Paragraph(contact_line, contact_style),
    ]

    if PHOTO_PATH.exists():
        photo = RLImage(str(PHOTO_PATH), width=0.95 * inch, height=1.27 * inch)
        header_table = Table([[left_cell, photo]], colWidths=[5.95 * inch, 1.15 * inch])
        header_table.setStyle(TableStyle([
            ("VALIGN", (0, 0), (0, 0), "TOP"),
            ("VALIGN", (1, 0), (1, 0), "TOP"),
            ("ALIGN", (1, 0), (1, 0), "RIGHT"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ("BOX", (1, 0), (1, 0), 0.75, colors.HexColor("#cbd5e1")),
            ("LEFTPADDING", (1, 0), (1, 0), 2),
            ("RIGHTPADDING", (1, 0), (1, 0), 2),
            ("TOPPADDING", (1, 0), (1, 0), 2),
            ("BOTTOMPADDING", (1, 0), (1, 0), 2),
        ]))
        story.append(header_table)
    else:
        story.append(Paragraph(PROFILE["name"], name_style))
        story.append(Paragraph(PROFILE["title"], title_style))
        story.append(Paragraph(contact_line, contact_style))

    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1.2, color=accent, spaceAfter=2))

    def section(title):
        story.append(Paragraph(title, section_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceAfter=4))

    # Summary
    section("Professional Summary")
    story.append(Paragraph(SUMMARY, body_style))

    # Skills
    section("Skills")
    skill_rows = [[Paragraph(f"<b>{cat}</b>", body_style), Paragraph(val, body_style)] for cat, val in SKILLS]
    skills_table = Table(skill_rows, colWidths=[1.4 * inch, 5.5 * inch])
    skills_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(skills_table)

    # Experience
    section("Experience")
    for job in EXPERIENCE:
        header = Table(
            [[Paragraph(f"{job['role']} — {job['company']}", role_style),
              Paragraph(job["period"], meta_style)]],
            colWidths=[5.4 * inch, 1.5 * inch],
        )
        header.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("ALIGN", (1, 0), (1, 0), "RIGHT"),
        ]))
        story.append(header)
        for p in job["points"]:
            story.append(Paragraph(p, bullet_style, bulletText="•"))
        story.append(Spacer(1, 4))

    # Projects
    section("Projects")
    for proj in PROJECTS:
        story.append(Paragraph(proj["name"], role_style))
        story.append(Paragraph(proj["meta"], meta_style))
        for p in proj["points"]:
            story.append(Paragraph(p, bullet_style, bulletText="•"))
        story.append(Spacer(1, 4))

    # Certifications
    section("Certifications")
    for c in CERTIFICATIONS:
        line = f"{c['name']} — <font color='#0d9488'>{c['status']}</font>"
        if c.get("meta"):
            line += f"  <font color='#475569'>({c['meta']})</font>"
        story.append(Paragraph(line, body_style))
        if c.get("verify"):
            story.append(Paragraph(
                f"<font size=7.5 color='#475569'>Verify: <a href='{c['verify']}'>{c['verify']}</a></font>",
                body_style,
            ))

    doc.build(story)
    pdf = buffer.getvalue()
    buffer.close()
    return pdf
