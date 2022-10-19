from database import database as db


class Products(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    type = db.Column(db.String())
    price = db.Column(db.Integer)
    stock = db.Column(db.Integer)

    def __init__(self, name, type, price, stock):
        self.name = name
        self.type = type
        self.price = price
        self.stock = stock