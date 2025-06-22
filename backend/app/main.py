from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.generate_blog import router as generate_router
from app.api.blogs import router as blogs_router
from app.database.session import engine
from app.models.blog import Base
from app.api.generate_blog import BlogRequest
from sqlalchemy import text

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Blog Generator API",
    description="API for generating and managing AI-powered blog posts",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(generate_router, prefix="/api", tags=["generation"])
app.include_router(blogs_router, prefix="/api/blogs", tags=["blogs"])

@app.get("/")
async def root():
    return {"message": "AI Blog Generator API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.on_event("startup")
async def startup_event():
    # Warmup code
    from app.database.session import SessionLocal
    db = SessionLocal()
    try:
        db.execute(text("SELECT 1"))
    finally:
        db.close()