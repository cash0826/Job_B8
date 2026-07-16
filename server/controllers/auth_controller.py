from config import db
from flask import request, jsonify, make_response
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required
from sqlalchemy.exc import IntegrityError
from models.users import User

# /signup POST
class Signup(Resource):
  def post(self):
    request_json = request.get_json()
    
    name = request_json.get('name')
    email = request_json.get('email')
    password = request_json.get('password')
    image_url = request_json.get('image_url')
    
    if User.query.filter_by(email=email).first():
      return {"errors": ["Email already exists"]}, 400    
    
    user = User(
      name=name,
      image_url=image_url
    )
    user.password_hash = password
    
    try:
      db.session.add(user)
      db.session.commit()
      access_token = create_access_token(identity=str(user.id))
      return make_response(jsonify(token=access_token))
    except IntegrityError:
      db.session.rollback()
      return {'errors': ['400 Invalid data']}, 400

# /checkjwtid GET
class CheckJWTId(Resource):
  @jwt_required()
  def get(self):
    user_id = get_jwt_identity()
    user = User.query.filter(User.id == user_id).first()
    return {
      "id": user.id,
      "name": user.name,
      "email": user.email,
    }, 200

# /login POST
class Login(Resource):
  def post(self):
    request_json = request.get_json()
    email = request_json.get('email')
    password = request_json.get('password')
    
    user = User.query.filter_by(email=email).first()
    if user and user.authenticate(password):
      token = create_access_token(identity=str(user.id))
      return make_response(jsonify(
        token=token, 
        user=user.id, 
        email=user.email, 
        image_url=user.image_url
      ), 200)
    return {'errors': ['401 Unauthorized']}, 401
  
  # Logout is controlled by frontend. 
  # Remember to clear JWT token on frontend