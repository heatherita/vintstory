# Define your data models here
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Listing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    story = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    seller_name = db.Column(db.String(100), nullable=False)
    seller_contact = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(500), nullable=False)
    then_image_url = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    comments = db.relationship('Comment', backref='listing', lazy=True)


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'), nullable=False)