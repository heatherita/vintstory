from models import db
from dataclasses import dataclass
import json

# from app.models.comment import Comment


@dataclass
class Posting(db.Model):
    id: int
    title: str
    description: str
    story: str
    user_name: str
    user_contact: str
    image_url: str
    then_image_url: str
    # comments: list
    # comments: list[Comment]


    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.String(500))
    story = db.Column(db.String(500))
    user_name = db.Column(db.String(100))
    user_contact = db.Column(db.String(100))
    image_url = db.Column(db.String(200))
    then_image_url = db.Column(db.String(200))
    comments = db.relationship('Comment', backref='posting', cascade="all, delete-orphan")
