from flask import Flask, render_template, request, make_response, jsonify
from database import database as db
from models.user_model import Users
from models.product_model import Products
from models.token_model import Tokens
from flask_migrate import Migrate
from token_service import generate_access_token, encode_token, generate_refresh_token

from dotenv import load_dotenv
import os


load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres:{os.environ.get('DB_PASSWORD')}@localhost:5432/k_bag"

db.init_app(app)

migrate = Migrate(app, db)


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
    user = Users.query.filter_by(email = data['email']).all()
    
    #if no user in database response 400
    if user:
        return make_response(jsonify({'message':'User already exist'}), 400)
    refresh = generate_access_token({'email': data['email'], })
    user = Users(data['email'], data['password'])
    db.session.add(user)
    db.session.commit()
    db.session.add(Tokens(refresh, user_id=user.id))
    db.session.commit()
    return make_response(jsonify({'message':'Successfully registered'}), 200)


@app.route('/login/auth', methods=['POST'])
def auth_user():
    data = request.get_json()
    user = Users.query.filter_by(email = data['email']).all()[0]

    #If user doesn't exist or wrong email/password response 400
    #Else return access token
    if not user:
        return make_response(jsonify({'message':'User doesn\'t exist'}), 400)
    if user.email == data['email'] and user.password == data['password']:
        token = generate_access_token({'email': data['email']})
        return make_response(jsonify({'message':'Successfully logged in', 'token': token}), 200)
    return make_response(jsonify({'message':'User doesn\'t exist'}, 400))