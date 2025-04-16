#Define your data models here
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
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    comments = db.relationship('Comment', backref='listing', lazy=True)

    # def __init__(self, title: str, description: str, price: float, sell_name: str, sell_cont: str, img_url: str, t_img_url: str):
    #     self.title = title
    #     self.description = description
    #     self.price = price
    #     self.seller_name = sell_name
    #     self.seller_contact = sell_cont
    #     self.image_url = img_url
    #     self.then_image_url = t_img_url


    # def create(self):
    #     new_listing = Listing(self.title, self.description, self.price, self.seller_name, self.seller_contact, self.image_url, self.then_image_url)
    #     db.session.add(new_listing)
    #     db.session.commit()

    def __repr__(self):
        return f"Title : {self.title}, Description: {self.description}"

    @staticmethod
    def print_all_listing():
        listing_data = Listing.query.all()
        return listing_data


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'), nullable=False)

    @staticmethod
    def print_all_comment():
        comment_data = Comment.query.all()
        return comment_data

class DataHelper:

    @staticmethod
    def add_listing_data():
        for item in dummy_listing_items:
            print(item)
            listing_obj = Listing(*item)
            listing_obj.create()
        print("all listings added")

    @staticmethod
    def print_listing_data():
        listings = Listing.print_all_listing()
        for listing in listings:
            print(
                f"Title : {listing.title} , "
                f"Description {listing.description}"
            )




