from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models.comment import Comment

class CommentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Comment
        load_instance = True

