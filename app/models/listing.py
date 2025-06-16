# from app.models import db


class Listing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.String(500))
    story = db.Column(db.String(500))
    price = db.Column(db.Float)
    seller_name = db.Column(db.String(100))
    seller_contact = db.Column(db.String(100))
    image_url = db.Column(db.String(200))
    then_image_url = db.Column(db.String(200))
    comments = db.relationship('Comment', backref='listing', cascade="all, delete-orphan")
