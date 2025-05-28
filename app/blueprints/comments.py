from flask import Blueprint, request, redirect
from models.comment import Comment
from models import db

comments_bp = Blueprint('comments', __name__)

@comments_bp.route('/add_comment/<int:listing_id>', methods=['POST'])
def add_comment_listing(listing_id):
    new_comment = Comment(
        content=request.form['content'],
        listing_id=listing_id
    )
    db.session.add(new_comment)
    db.session.commit()
    return redirect(f'/listing/{listing_id}')

@comments_bp.route('/add_comment/<int:posting_id>', methods=['POST'])
def add_comment_posting(posting_id):
    new_comment = Comment(
        content=request.form['content'],
        posting_id=posting_id
    )
    db.session.add(new_comment)
    db.session.commit()
    return redirect(f'/posting/{posting_id}')