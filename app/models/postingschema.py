from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from app.models.commentschema import CommentSchema
from app.models.posting import Posting


class PostingSchema(SQLAlchemyAutoSchema):
    comments = fields.Nested(CommentSchema, many=True)

    class Meta:
        model = Posting
        include_relationships = True
        load_instance = True

