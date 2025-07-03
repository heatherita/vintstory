from app.models import db
from app.models.comment import Comment
from app.models.posting import Posting


class DataHelper:

    #postings -> comments are like customers -> orders in terms of normalization. Each comment should have a posting fk.
    @staticmethod
    def add_dummy_posting_data():
        dummy_comments = [
            ['here\'s my version',
             'michael-kors-white-cobalt-pleated-stripe-skirt-white-product-2-893005119-normal-1652779414.jpeg'],
            ['I like green', '20250416_093805.jpg'],
            ['Wow man', '20250416_093805.jpg'],
            ['That\'s me in 1978', 'bc6762d467a230893e82f65edd246b67-1766851409.png'],
            ['I wore this to every prom!', '252420-3058550390.jpg']
        ]

        dummy_posting_items = [
            ['blouse', 'nice pretty blouse', 'found at the store', 'martin', 'hbuch4@yahoo.com',
             'm_6366cf083b982a2451e5dbf9-2147602395.jpg', 'bla', [0, 2]],
            ['shorts suit', 'abstract shorts suit', 'bought at Esprit flagship store', 'sam', 'hbuch4@yahoo.com',
             'th-1487244758.jpeg', 'bla', [3]],
            ['skirt', 'striped skirt', 'found in a pond', 'jenny', 'hbuch4@yahoo.com', '252420-3058550390.jpg',
             'doh', [1]],
            ['dress', 'a checkered dress', 'this checkered dress has a checkered past', 'rudolph',
             'hbuch4@yahoo.com',
             'kate-spade-laventura-stripe-coreen-striped-skirt-product-1-16046188-202686913-3610312227.jpeg', 'doh',
             [4]]
        ]

        postings = []

        # Step 1: Add postings without comments first
        for item in dummy_posting_items:
            title, description, story, user_name, user_contact, image_url, then_image_url, _ = item
            posting = Posting(
                title=title,
                description=description,
                story=story,
                user_name=user_name,
                user_contact=user_contact,
                image_url=image_url,
                then_image_url=then_image_url
            )
            db.session.add(posting)
            postings.append(posting)

        db.session.flush()  # Now postings have IDs

        # Step 2: Add comments and link to postings
        for i, comment_data in enumerate(dummy_comments):
            content, image_url = comment_data
            # Find which posting(s) this comment should belong to
            for post_index, (_, _, _, _, _, _, _, comment_indices) in enumerate(dummy_posting_items):
                if i in comment_indices:
                    comment = Comment(content=content, image_url=image_url, posting_id=postings[post_index].id)
                    db.session.add(comment)

        db.session.commit()



 # fake = Faker()
#
# vintage_image_urls = [
#     "https://upload.wikimedia.org/wikipedia/commons/3/38/Vintage_blouse.jpg",
#     "https://upload.wikimedia.org/wikipedia/commons/6/6b/1950s_dress_catalog_page.jpg",
#     "https://upload.wikimedia.org/wikipedia/commons/a/ab/Antique_clothing_display.jpg",
#     "https://upload.wikimedia.org/wikipedia/commons/0/0b/Vintage_woman_fashion_1940s.jpg",
#     "https://upload.wikimedia.org/wikipedia/commons/e/e6/Vintage_thrift_store.jpg",
#     "https://upload.wikimedia.org/wikipedia/commons/0/00/Vintage_men_suits_1920s.jpg"
# ]
#
#
    @staticmethod
    def add_random_fake_postings(num_postings=10, max_comments_per_posting=3):
        for _ in range(num_postings):
            image_url = random.choice(vintage_image_urls)
            then_image_url = random.choice(vintage_image_urls)
            posting = Posting(
                title=fake.catch_phrase(),
                description=fake.text(max_nb_chars=200),
                story=fake.paragraph(),
                user_name=fake.first_name(),
                user_contact=fake.email(),
                image_url=image_url,
                then_image_url=then_image_url
            )
            db.session.add(posting)
            db.session.flush()

            for _ in range(random.randint(0, max_comments_per_posting)):
                comment = Comment(
                    content=fake.sentence(),
                    image_url=random.choice(vintage_image_urls),
                    posting_id=posting.id
                )
                db.session.add(comment)

        db.session.commit()
#
#example usage:
#DataHelper.add_random_postings(num_postings=5, max_comments_per_posting=2)
