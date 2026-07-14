from config import app, api
from flask import request
from flask_jwt_extended import verify_jwt_in_request, exceptions
from models import User, Job, Contact, Event, Contact, Document
from controllers import Signup, CheckJWTId, Login, JobDashboard, Events, Contacts, Documents

# Resources / Controllers
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckJWTId, '/checkjwtid', endpoint='checkjwtid')
api.add_resource(Login, '/login', endpoint='login')

api.add_resource(
  JobDashboard, 
  '/jobs', 
  '/jobs/<int:job_id>', 
  endpoint='jobs')

api.add_resource(
  Events, 
  '/events', 
  '/jobs/<int:job_id>/events',
  '/jobs/<int:job_id>/events/<int:event_id>',
  endpoint='events' )

api.add_resource(
  Contacts,
  '/contacts',
  '/jobs/<int:job_id>/contacts',
  '/jobs/<int:job_id>/contacts/<int:contact_id>',
  endpoint='contacts'
)

api.add_resource(
  Documents,
  '/documents',
  '/jobs/<int:job_id>/documents',
  '/jobs/<int:job_id>/documents/<int:document_id>',
  endpoint='documents'
)

if __name__ == "__main__":
  app.run(debug=True, port=5555)