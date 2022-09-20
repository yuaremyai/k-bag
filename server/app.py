from flask import Flask, render_template, request, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:root@localhost:5432/k_bag"
db = SQLAlchemy(app)
migrate = Migrate(app, db)

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


class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(), unique=True)
    password = db.Column(db.String())

    def __init__(self, email, password):
        self.email = email
        self.password = password


@app.route("/")
def index():
    sweaters = Products.query.filter_by(name = 'sweater').all()
    return render_template('index.html', sweaters = sweaters)


@app.route('/product')
def prod():
    sweaters = Products.query.filter_by(name = 'sweater').all()
    return render_template('product.html', sweaters = sweaters)


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/login/register', methods=['POST'])
def register_user():
    data = request.get_json()
    result = Users.query.filter_by(email = data['email']).all()
    if result:
        return make_response(jsonify({'message':'User already exist'}), 400)
    db.session.add(Users(data['email'], data['password']))
    db.session.commit()
    return make_response(jsonify({'message':'Successfully registered'}), 200)


@app.route('/login/login', methods=['GET'])
def auth_user():
    return render_template('index.html')