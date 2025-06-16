from flask import Blueprint, render_template, request, redirect, jsonify, current_app
from app.models import db, comment, data_helper, posting
# from app.models.comment import Comment
# from app.models.data_helper import DataHelper
# from app.models.posting import Posting

postings_bp = Blueprint('postings', __name__)

@postings_bp.route('/')
def index():
    return render_template('index.html')

@postings_bp.route('/api/postings', methods=['GET'])
def postings():
    items = posting.Posting.query.all()
    for item in items:
        print('item: ', item);
    return jsonify(items)

@postings_bp.route('/add', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        new_item = posting.Posting(
            title=request.form['title'],
            description=request.form['description'],
            story=request.form['story'],
            seller_name=request.form['seller_name'],
            seller_contact=request.form['seller_contact'],
            image_url=request.form['image_url'],
            then_image_url=request.form.get('then_image_url')
        )
        db.session.add(new_item)
        db.session.commit()
        return redirect('/postings')
    return render_template('add_item.html')

@postings_bp.route('/api/posting/<int:posting_id>')
def show_posting(posting_id):
    return redirect('/api/postings')  # Placeholder - update if you want detailed views

@postings_bp.route('/data/postings/add')
def add_data():
    data_helper.DataHelper.add_dummy_posting_data()
    return redirect('/postings')

@postings_bp.route('/data/postings/delete')
def delete_data():
    posting.Posting.query.delete()
    comment.Comment.query.delete()
    db.session.commit()
    return redirect('/postings')
