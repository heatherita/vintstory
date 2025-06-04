from flask import Blueprint, render_template, send_from_directory, request, redirect, current_app
from models.posting import Posting
from models.comment import Comment
from models.data_helper import DataHelper
from models import db

collage_bp = Blueprint('collage', __name__)

@collage_bp.route('/')
def index():
    return render_template('index.html')

@collage_bp.route('/collage')
def collage():
    return render_template('collage_embed.html')

@collage_bp.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('react_build', path)