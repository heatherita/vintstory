from app.models import db
from marshmallow import Schema, fields


class CommentsSchema(Schema):

    id = fields.Integer()
    content = fields.String(500)
    image_url = fields.String(500)
    posting_id = db.Column(db.Integer, db.ForeignKey('posting.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'))

