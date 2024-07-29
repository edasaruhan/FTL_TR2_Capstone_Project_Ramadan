# models.py

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(120), nullable=False)
    
    health_records = relationship("HealthRecord", back_populates="user")

class HealthRecord(Base):
    __tablename__ = 'health_records'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    record_date = Column(DateTime, default=datetime.datetime.utcnow)
    weight = Column(Integer)
    height = Column(Integer)
    blood_pressure = Column(String(20))

    user = relationship("User", back_populates="health_records")
