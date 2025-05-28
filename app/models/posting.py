from models import db

class Posting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.String(500))
    story = db.Column(db.String(500))
    user_name = db.Column(db.String(100))
    user_contact = db.Column(db.String(100))
    image_url = db.Column(db.String(200))
    then_image_url = db.Column(db.String(200))
    comments = db.relationship('Comment', backref='posting', cascade="all, delete-orphan")
