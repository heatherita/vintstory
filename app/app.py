import shutil
import subprocess
import click
from flask import Flask, send_from_directory
from config import ProductionConfig, Config, DevelopmentConfig
from app.models import db
import os



def create_app():
    app = Flask(__name__)

    @app.cli.command("build-assets")
    def build_assets():
        react_path = os.path.join(os.path.dirname(__file__), 'static', 'react')
        try:
            subprocess.run(["npm","install"], cwd=react_path, check=True)
            subprocess.run(["npm", "run", "build"], cwd=react_path, check=True)
            click.echo("✅ React frontend built successfully.")
        except subprocess.CalledProcessError as e:
            click.echo(f"X Error building frontend: {e}")

            if os.path.exists(output_path):
                shutil.rmtree(output_path)
            shutil.copytree(build_path,output_path)
            click.echo(f" Copied build to: {output_path}")
        except subprocess.CalledProcessError as e:
            click.echo(f"X Build failed: {e}")


    app.config.from_object('config.ProductionConfig')
    db.init_app(app)

    IMG_FOLDER = os.path.join(app.root_path,"static", "uploads")
    os.makedirs(IMG_FOLDER, exist_ok=True)
    app.config["UPLOAD"] = IMG_FOLDER

    from app.blueprints.listings import listings_bp
    from app.blueprints.postings import postings_bp
    from app.blueprints.comments import comments_bp
    app.register_blueprint(listings_bp)
    app.register_blueprint(postings_bp)
    app.register_blueprint(comments_bp)

    with app.app_context():
#       db.drop_all()
        db.create_all()

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def catch_all(path):
        return send_from_directory('static/react/dist', 'index.html')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
