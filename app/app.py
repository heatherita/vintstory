from flask import Flask, render_template, request, redirect
from models import db, Listing, Comment
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///home/heather/dev/PycharmProjects/vintstory/vintage_items.db'
app.config['SECRET_KEY'] = '0910685913db76a220ac0f5672c3e3'
#db = SQLAlchemy(app)
db.init_app(app)



# Home page to show listings
@app.route('/')
def index():
    items = Listing.query.all()
    return render_template('index.html', items=items)

# Page for adding a new listing
@app.route('/add', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        story = request.form['story']
        price = float(request.form['price'])
        seller_name = request.form['seller_name']
        seller_contact = request.form['seller_contact']
        image_url = request.form['image_url']
        then_image_url = request.form.get('then_image_url')

        new_item = Listing(title=title, description=description, story=story, price=price,
                           seller_name=seller_name, seller_contact=seller_contact,
                           image_url=image_url, then_image_url=then_image_url)
        db.session.add(new_item)
        db.session.commit()

        return redirect('/')

    return render_template('add_item.html')

if __name__ == '__main__':
    app.run(debug=True)