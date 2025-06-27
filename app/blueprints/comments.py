from flask import Blueprint, request, redirect, current_app, jsonify, send_from_directory
from werkzeug.utils import secure_filename
# from app.models import db, comment
import os

from app.models import db
from app.models.comment import Comment
from app.models.commentschema import CommentSchema
import json

comments_bp = Blueprint('comments', __name__)

@comments_bp.route('/api/add_comment/<int:posting_id>', methods=['POST'])
def add_comment_posting(posting_id):
    print('comment request:',request.data)
    data = request.get_json()
    new_comment = Comment(
        content=data['content'],
        posting_id=posting_id
    )
    schema = CommentSchema(many=False)
    result = schema.dump(new_comment)
    print('post json: ', json.dumps(result, indent=4))
    postjson = jsonify(result)
    return postjson


@comments_bp.route('/api/add_comment_list/<int:posting_id>', methods=['POST'])
def add_comment_posting_list(posting_id):
    print('comment request:',request.data)
    data = request.get_json()
    new_comment = Comment(
        content=data['content'],
        posting_id=posting_id
    )
    print("added comment ", new_comment.content)
    db.session.add(new_comment)
    db.session.commit()
    return redirect(f'/api/posting/{posting_id}')

@comments_bp.route('/api/add_image/<int:posting_id>', methods=['GET', 'POST'])
def file_upload(posting_id):
    if request.method == 'POST':
        # data = request.get_json()
        f = request.files.get('file')
        filename = secure_filename(f.filename)
        f.save(os.path.join(current_app.config['UPLOAD'], filename))

        new_comment = Comment(
            content=request.form.get('content'),
            posting_id=posting_id,
            image_url=filename
        )
    schema = CommentSchema(many=False)
    result = schema.dump(new_comment)
    print('post json: ', json.dumps(result, indent=4))
    postjson = jsonify(result)
    return postjson
        # db.session.add(new_comment)
        # db.session.commit()
        #return send_from_directory(current_app.config['UPLOAD'], filename)
        #return redirect(f'/api/posting/{posting_id}')