from config import app, api
from flask import request
from flask_jwt_extended import verify_jwt_in_request
from models import User, Job, Contact, Event, Contact, AssociatedDocument
from controllers import Signup, CheckJWTId, Login

@app.before_request
def check_if_logged_in():
  open_access = ['signup', 'checkjwtid', 'login']
  if (request.endpoint) not in open_access and (not verify_jwt_in_request()):
    return {'errors': ['401 Unauthorized']}, 401
  
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckJWTId, '/checkjwtid', endpoint='checkjwtid')
api.add_resource(Login, '/login', endpoint='login')

if __name__ == "__main__":
  app.run(debug=True, port=5555)