from config import app, api
from flask import request
from flask_jwt_extended import verify_jwt_in_request, exceptions
from models import User, Job, Contact, Event, Contact, Document
from controllers import Signup, CheckJWTId, Login

# Resources / Controllers
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckJWTId, '/checkjwtid', endpoint='checkjwtid')
api.add_resource(Login, '/login', endpoint='login')

if __name__ == "__main__":
  app.run(debug=True, port=5555)