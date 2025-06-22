from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.sql import func
from app.database.session import Base
import uuid

class Blog(Base):
    __tablename__ = "blogs"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    topic = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    tone = Column(String(50))
    length = Column(String(50))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "topic": self.topic,
            "content": self.content,
            "tone": self.tone,
            "length": self.length,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }