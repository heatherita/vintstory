from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models.listing import Listing


class ListingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Listing
        include_relationships = True
        load_instance = True

