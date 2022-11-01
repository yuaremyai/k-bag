from flask import Flask, request, make_response
from database import database as db
from models.user_model import Users
from models.product_model import Products
from models.token_model import Tokens
from models.cart_model import Cart
from flask_migrate import Migrate
from token_service import generate_access_token, decode_token, generate_refresh_token
from flask_cors import CORS

from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres:{os.environ.get('DB_PASSWORD')}@localhost:5432/k_bag"

db.init_app(app)

migrate = Migrate(app, db)


def check_auth(request):
    token = request.headers.get('Authorization')
    if token:
        encode = decode_token(token.split()[1], True)
        if encode:
            return encode
    return False

def set_token(token, id):
    row = Tokens.query.filter_by(user_id = id).first()
    row.token = token
    db.session.commit()


@app.route("/", methods=['GET'])
def index():
    if check_auth(request):
        return make_response({'message':'User authorized'}, 200)
    return make_response({'message':'User unauthorized'}, 401)


@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    user = Users.query.filter_by(email = data['email']).all()
    if user:
        return make_response({'message':'User already exist'}, 400)
    user = Users(data['email'], data['password'])
    db.session.add(user)
    db.session.add(Tokens(None, user_id=user.id))
    db.session.commit()
    return make_response({'message':'Successfully registered'}, 200)


@app.route('/login', methods=['POST'])
def auth_user():
    data = request.get_json()
    user = Users.query.filter_by(email = data['email']).first()
    if not user:
        return make_response({'message':'User doesn\'t exist'}, 400)
    if user.email == data['email'] and user.password == data['password']:
        access_token = generate_access_token({'email': user.email, 'id': user.id})
        refresh_token = generate_refresh_token({'email': user.email, 'id': user.id})
        set_token(refresh_token, user.id)
        res = make_response({'message':'Successfully logged in', 'token': access_token}, 200)
        res.set_cookie('refreshToken', refresh_token, httponly=True)
        return res
    return make_response({'message':'User doesn\'t exist'}, 400)


@app.route('/refresh', methods=['GET'])
def refresh():
    token = request.cookies.get('refreshToken')
    token_data = decode_token(token, False)
    if token_data:
        db_token = Tokens.query.filter_by(user_id = token_data['id']).first()
        if db_token.token == token:
            access_token = generate_access_token(token_data)
            refresh_token = generate_refresh_token(token_data)
            set_token(refresh_token, token_data['id'])
            res = make_response({'message': 'Token sucessfully refreshed', 'token':access_token}, 200)
            res.set_cookie('refreshToken', refresh_token, httponly=True)
            return res
        return make_response({'message': 'Bad token'}, 400)
    return make_response({'message': 'Token expired or not exist'}, 401)


@app.route('/logout', methods=['GET'])
def logout():
    user = check_auth(request)
    res = make_response({'message': 'Sucessfully logged out'}, 200)
    res.delete_cookie('refreshToken')
    set_token(None, user['id'])
    return res


@app.route('/getcart', methods=['GET'])
def get_cart():
    user = check_auth(request)
    if not user:
        return make_response({'message':'Unathorized error'}, 401)
    cart_products = Cart.query.filter_by(user_id = user['id']).all()
    products = {}
    for obj in cart_products:
        product = Products.query.filter_by(id = obj.product_id).first()
        if product.name in products.keys():
            products[product.name]['count'] = products[product.name]['count'] + 1
        else:
            products[product.name] = {'type':product.type, 'price':product.price, 'stock':product.stock, 'count': 1}
    return make_response({'products': products}, 200)

@app.route('/removecart', methods=['POST'])
def remover_cart():
    user = check_auth(request)
    if not user:
        return make_response({'message':'Unathorized error'}, 401)
    data = request.get_json()
    product = Products.query.filter_by(name = data['name']).first()
    cart_product = Cart.query.filter_by(user_id = user['id'], product_id = product.id).first()
    db.session.delete(cart_product)
    db.session.commit()
    return make_response({'message': 'Sucessfully deleted from cart'}, 200)


@app.route('/postcart', methods=['POST'])
def add_to_cart():
    user = check_auth(request)
    if not user:
        return make_response({'message':'Unathorized error'}, 401)
    data = request.get_json()
    product = Products.query.filter_by(name = data['name']).first()
    db.session.add(Cart(user=user['id'], product= product.id))
    db.session.commit()
    return make_response({'message': 'Sucessfully added to cart'}, 200)
    