from database import database as db


class Cart(db.Model):
    __tablename__ = 'cart'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id', ondelete="CASCADE"))

    def __init__(self, user, product):
        self.user_id = user
        self.product_id = product