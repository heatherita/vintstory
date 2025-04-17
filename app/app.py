from flask import Flask, render_template, request, redirect
# from listing import db, Listing
# from comment import Comment
from models import db, Listing, Comment, DataHelper


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vintage_whatever.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Avoids a warning

#app.config['SECRET_KEY'] = '0910685913db76a220ac0f5672c3e3'
#db = SQLAlchemy(app)
db.init_app(app)
# DataHelper.add_listing_data()
# DataHelper.print_listing_data()



# Home page to show listings
@app.route('/')
def index():
    # items = Listing.query.all()
    return render_template('index.html')


# Listing page to show listings
@app.route('/listings',methods=['GET'])
def listings():
    items = Listing.query.all()
    return render_template('listing_page.html', items=items)


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

        return redirect('/listings')
        #return redirect('listing_page.html')

    return render_template('add_item.html')

# Route to handle comments for a specific listing
@app.route('/add_comment/<int:listing_id>', methods=['POST'])
def add_comment(listing_id):
    content = request.form['content']
    new_comment = Comment(content=content, listing_id=listing_id)

    db.session.add(new_comment)
    db.session.commit()

    return redirect(f'/listing/{listing_id}')


@app.route('/listing/<int:listing_id>')
def show_listing(listing_id):
    item = Listing.query.get_or_404(listing_id)
    # return render_template('listing_page.html', item=item)
    return redirect('/listings')

# Populate with dummy data
@app.route('/data/add', methods=['GET'])
def add_data():
    # if request.method == 'POST':
    dummy_listing_comments_1 = ["what a cool blouse!", "that blouse just beats all", "I have a blouse just like it!", "it's on fire!"]
    dummy_listing_comments_2 = ["what a striped skirt!", "that skirt is so fashionable", "I would wear that every day", "That's like a skirt i had during the roman times"]
    dummy_listing_comments_3 = ["well! I never!", "don't assume!"]

    dummy_listing_items = [
        ['blouse', 'nice pretty blouse', 'found at the store', 12.0, 'martin', 'hbuch4@yahoo.com', 'bla', 'bla', dummy_listing_comments_1],
        ['skirt', 'striped skirt', 'found in a pond', 32.0, 'jenny', 'hbuch4@yahoo.com', 'doh', 'doh', dummy_listing_comments_2],
        ['dress', 'a checkered dress', 'this checkered dress has a checkered past', 42.0, 'rudolph', 'hbuch4@yahoo.com', 'doh', 'doh', dummy_listing_comments_3]
    ]

    for item in dummy_listing_items:
        title = item[0]
        description = item[1]
        story = item[2]
        price = item[3]
        seller_name = item[4]
        seller_contact = item[5]
        image_url = item[6]
        then_image_url = item[7]
        comments = item[8]

        listingComments = []
        for comment in comments:
            # new_comment = Comment(content=comment)
            listingComments.append(Comment(content=comment))

        new_item = Listing(title=title, description=description, story=story, price=price,
                           seller_name=seller_name, seller_contact=seller_contact,
                           image_url=image_url, then_image_url=then_image_url,comments=listingComments)

        db.session.add(new_item)
        db.session.commit()
    return redirect('/listings')
    # return render_template('index.html')


# Clear out all dummy data
@app.route('/data/delete', methods=['GET'])
def delete_data():
    Listing.query.delete()
    Comment.query.delete()
    db.session.commit()
    return redirect('/listings')
    # return render_template('index.html')


if __name__ == '__main__':
    with app.app_context():  # Needed for DB operations outside a request
         db.create_all()  # Creates the database and tables
    app.run(debug=True)