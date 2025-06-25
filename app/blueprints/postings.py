from flask import Blueprint, render_template, request, redirect, jsonify, current_app
from sqlalchemy.orm import joinedload

from app.models import db, data_helper
from app.models.comment import Comment
from app.models.posting import Posting
from app.models.postingschema import PostingSchema
import json

postings_bp = Blueprint('postings', __name__)

@postings_bp.route('/')
def index():
    return render_template('index.html')

@postings_bp.route('/api/postings', methods=['GET'])
def postings():
    items = Posting.query.options(joinedload(Posting.comments)).all()
    # for item in items:
    #     print('item: ', item);
    schema = PostingSchema(many=True)
    result = schema.dump(items)
    print('post json: ',json.dumps(result, indent=4))
    postjson = jsonify(result)
    return postjson

@postings_bp.route('/add', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        new_item = Posting(
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
    Posting.query.delete()
    Comment.query.delete()
    db.session.commit()
    return redirect('/postings')
