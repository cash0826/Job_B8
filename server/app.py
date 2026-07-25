from config import app, api
from flask import send_from_directory, abort
from models import User, Job, Contact, Event, Contact, Document
from controllers import Signup, CheckJWTId, Login, JobDashboard, Events, JobEvents, Contacts, JobContacts, Documents, JobDocuments

# Resources / Controllers
api.add_resource(Signup, '/api/signup')
api.add_resource(CheckJWTId, '/api/checkjwtid')
api.add_resource(Login, '/api/login')

#  Jobs
api.add_resource(JobDashboard, '/api/jobs')

# Events
api.add_resource(Events, '/api/events')
api.add_resource(JobEvents, '/api/jobs/<int:job_id>/events')

# Contacts
api.add_resource(Contacts, '/api/contacts')
api.add_resource(JobContacts, '/api/jobs/<int:job_id>/contacts')

# Documents
api.add_resource(Documents, '/api/documents')
api.add_resource(JobDocuments, '/api/jobs/<int:job_id>/documents')

# Catch All
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    # If the request is for an API route, do NOT serve React
    if path.startswith('api'):
        abort(404)

    # Serve React build (index.html)
    return send_from_directory('static', 'index.html')

if __name__ == "__main__":
  app.run(debug=True, port=5555)