from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models.comment import Comment

class CommentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Comment
        include_relationships = True
        load_instance = True

