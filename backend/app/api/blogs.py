from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.blog import Blog
from app.database.session import get_db
from datetime import datetime

router = APIRouter()

@router.post("/")
async def create_blog(blog_content: str, db: Session = Depends(get_db)):
    try:
        new_blog = Blog(
            content=blog_content,
            created_at=datetime.utcnow()
        )
        db.add(new_blog)
        db.commit()
        db.refresh(new_blog)
        return {"message": "Blog saved successfully", "id": str(new_blog.id)}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save blog: {str(e)}"
        )

@router.get("/")
async def get_blogs(db: Session = Depends(get_db)):
    blogs = db.query(Blog).order_by(Blog.created_at.desc()).all()
    return {"blogs": [blog.to_dict() for blog in blogs]}