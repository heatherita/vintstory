from flask import Blueprint, request, redirect, current_app, send_from_directory
from werkzeug.utils import secure_filename

# from werkzeug.utils import secure_filename
import app.models.comment
#import app.models.db
from app.models import db, comment
import os


comments_bp = Blueprint('comments', __name__)
#app = Flask(__name__)

@comments_bp.route('/api/add_comment/<int:listing_id>', methods=['POST'])
def add_comment_listing(listing_id):
    new_comment = comment.Comment(
        content=request.form['content'],
        listing_id=listing_id
    )
    db.session.add(new_comment)
    db.session.commit()
    return redirect(f'/listing/{listing_id}')

@comments_bp.route('/add_comment/<int:posting_id>', methods=['POST'])
def add_comment_posting(posting_id):
    new_comment = comment.Comment(
        content=request.form['content'],
        posting_id=posting_id
    )
    db.session.add(new_comment)
    db.session.commit()
    return redirect(f'/posting/{posting_id}')

@comments_bp.route('/api/add_image/<int:posting_id>', methods=['GET', 'POST'])
def file_upload(posting_id):
    if request.method == 'POST':
        f = request.files['file']
        filename = secure_filename(f.filename)
        f.save(os.path.join(current_app.config['UPLOAD'], filename))

        new_comment = comment.Comment(
            content=request.form['content'],
            posting_id=posting_id,
            image_url=filename
        )
        db.session.add(new_comment)
        db.session.commit()
        #return send_from_directory(current_app.config['UPLOAD'], filename)
    return redirect(f'/api/posting/{posting_id}')