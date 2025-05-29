from flask import Flask
from models import db
import os
from blueprints.listings import listings_bp
from blueprints.postings import postings_bp
from blueprints.comments import comments_bp

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vintage_whatever.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)


    IMG_FOLDER = os.path.join("static", "images")
    app.config["UPLOAD"] = IMG_FOLDER

    app.register_blueprint(listings_bp)
    app.register_blueprint(postings_bp)
    app.register_blueprint(comments_bp)

    with app.app_context():
#       db.drop_all()
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
