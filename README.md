# Railway deployment

This repository contains separate frontend and backend services. Create one
Railway service for each directory and set each service's **Root Directory**:

- Frontend: `/frontend`
- Backend: `/backend`

Railway reads the corresponding `railway.json` in each service root.

## Frontend service

The frontend uses Node 20 or 22 and npm. Railway builds the static React app,
then serves it through the Express server on Railway's assigned `PORT`.

Set this build-time variable to the public URL of the backend service:

```text
REACT_APP_BACKEND_URL=https://<backend-domain>
```

## Backend service

The backend uses Python 3.12 and starts with Uvicorn. Set these variables:

```text
MONGO_URL=<MongoDB connection string>
DB_NAME=<MongoDB database name>
JWT_SECRET=<long random secret>
INBOX_PASSWORD=<strong inbox password>
CORS_ORIGINS=https://<frontend-domain>
```

Add the frontend's Railway domain to `CORS_ORIGINS` after the domain is
assigned. For a custom domain, include that origin as well (comma-separated).

The frontend and backend must be deployed as separate services; the frontend
does not proxy `/api` requests to the backend automatically. The frontend
build embeds `REACT_APP_BACKEND_URL`, so redeploy it after changing that value.

For backend development and tests, install `backend/requirements-dev.txt`;
Railway installs only the production dependencies in `backend/requirements.txt`.
