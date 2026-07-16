from config import app, api
from models import User, Job, Contact, Event, Contact, Document
from controllers import Signup, CheckJWTId, Login, JobDashboard, Events, JobEvents, Contacts, JobContacts, Documents, JobDocuments

# Resources / Controllers
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckJWTId, '/checkjwtid', endpoint='checkjwtid')
api.add_resource(Login, '/login', endpoint='login')

api.add_resource(
  JobDashboard, 
  '/jobs', 
  '/jobs/<int:id>', 
  endpoint='jobs')

api.add_resource(
  JobEvents,
  '/jobs/<int:job_id>/events',
  '/jobs/<int:job_id>/events/<int:event_id>',
  endpoint='jobevents' )

api.add_resource(
  JobContacts,
  '/jobs/<int:job_id>/contacts',
  '/jobs/<int:job_id>/contacts/<int:contact_id>',
  endpoint='jobcontacts'
  )

api.add_resource(
  JobDocuments,
  '/jobs/<int:job_id>/documents',
  '/jobs/<int:job_id>/documents/<int:document_id>',
  endpoint='jobdocuments'
)

api.add_resource(Contacts, '/contacts', endpoint='contacts')
api.add_resource(Events, '/events', endpoint='events')
api.add_resource(Documents, '/documents', endpoint='documents')

if __name__ == "__main__":
  app.run(debug=True, port=5555)