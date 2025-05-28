from models import db

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500))
    image_url = db.Column(db.String(200))
    posting_id = db.Column(db.Integer, db.ForeignKey('posting.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'))