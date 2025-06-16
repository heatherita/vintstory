from flask import Blueprint, render_template, request, redirect

from app.models import db
from app.models.comment import Comment
from app.models.data_helper import DataHelper
from app.models.listing import Listing

listings_bp = Blueprint('listings', __name__)

@listings_bp.route('/')
def index():
    return render_template('index.html')

@listings_bp.route('/listings', methods=['GET'])
def listings():
    items = Listing.query.all()
    return render_template('posting_page.html', items=items)

@listings_bp.route('/add', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        new_item = Listing(
            title=request.form['title'],
            description=request.form['description'],
            story=request.form['story'],
            price=float(request.form['price']),
            seller_name=request.form['seller_name'],
            seller_contact=request.form['seller_contact'],
            image_url=request.form['image_url'],
            then_image_url=request.form.get('then_image_url')
        )
        db.session.add(new_item)
        db.session.commit()
        return redirect('/listings')
    return render_template('add_item.html')

@listings_bp.route('/listing/<int:listing_id>')
def show_listing(listing_id):
    return redirect('/listings')  # Placeholder - update if you want detailed views

@listings_bp.route('/data/listings/add')
def add_data():
    DataHelper.add_dummy_listing_data()
    return redirect('/listings')

@listings_bp.route('/data/listings/delete')
def delete_data():
    Listing.query.delete()
    Comment.query.delete()
    db.session.commit()
    return redirect('/listings')
