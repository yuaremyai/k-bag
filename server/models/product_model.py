from database import database as db


class Products(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    img_url = db.Column(db.String())
    type = db.Column(db.String())

    def __init__(self, name, img_name, type):
        self.name = name
        self.img_url= f'{img_name}.jpg'
        self.type = type