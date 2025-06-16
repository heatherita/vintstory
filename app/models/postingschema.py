from marshmallow import Schema, fields
from app.models.commentschema import CommentsSchema

class PostingSchema(Schema):

    id = fields.Integer()
    title = fields.String(100)
    description = fields.String(500)
    story = fields.String(100)
    user_name = fields.String(100)
    user_contact = fields.String(100)
    image_url = fields.String(200)
    then_image_url = fields.String(200)
    comments = fields.Nested(CommentsSchema, many=True)
