from database import database as db


class Tokens(db.Model):
    __tablename__ = 'tokens'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    token = db.Column(db.String())


    def __init__(self, token, user_id):
        self.user_id = user_id
        self.token = token