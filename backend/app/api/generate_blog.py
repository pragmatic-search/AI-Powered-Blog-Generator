from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Literal
import google.generativeai as genai
import os
from dotenv import load_dotenv
from app.database.session import get_db
from app.models.blog import Blog
from datetime import datetime
import uuid

# Load environment variables
load_dotenv()

router = APIRouter()

# Configure Gemini with better error handling
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is not set")

genai.configure(api_key=GEMINI_API_KEY)

class BlogRequest(BaseModel):
    topic: str
    tone: Literal["casual", "technical", "professional", "academic"]  # Added academic to match frontend
    length: Literal["short", "medium", "long"]

@router.post("/generate")
async def generate_blog(request: BlogRequest):
    try:
        # Validate API key at runtime
        if not GEMINI_API_KEY:
            raise HTTPException(
                status_code=500, 
                detail="Gemini API key is not configured"
            )
        
        # Define word counts based on length
        word_counts = {
            "short": 300,
            "medium": 500,
            "long": 800
        }
       
        # Create detailed prompt
        prompt = f"""
        Write a {word_counts[request.length]}-word {request.tone} blog post about "{request.topic}".
       
        Requirements:
        - Use Markdown formatting
        - Include headings (H2, H3)
        - Use bullet points for lists
        - Include 1-2 code examples if relevant (with proper syntax highlighting tags)
        - Use a {request.tone} tone throughout
        - Ensure the content is original and informative
       
        Structure:
        1. Introduction
        2. Main content with examples
        3. Conclusion
        """
       
        # Generate content
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.7,
                "top_p": 0.9,
                "max_output_tokens": 2048,
            }
        )
       
        # Save to database
        db = next(get_db())
        try:
            blog = Blog(
                id=str(uuid.uuid4()),
                topic=request.topic,
                content=response.text,
                tone=request.tone,
                length=request.length,
                created_at=datetime.utcnow()
            )
            db.add(blog)
            db.commit()
            db.refresh(blog)
        except Exception as db_error:
            db.rollback()
            # Continue even if DB save fails
            print(f"Database save failed: {db_error}")
        finally:
            db.close()
       
        return {"blog": response.text}
   
    except Exception as e:
        print(f"Error in generate_blog: {str(e)}")  # For debugging
        raise HTTPException(
            status_code=500,
            detail=f"Blog generation failed: {str(e)}"
        )