from flask import request, abort
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from services.contacts_service import ContactService
from models.contacts import Contact, ContactSchema

# global contact schema instance for serialization
contact_schema = ContactSchema()
contacts_schema = ContactSchema(many=True)

class Contacts(Resource):
  
  # GET /contacts
  @jwt_required()
  def get(self):
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    # Query all contacts for authenticated user
    contacts_query = ContactService.get_all_contacts_for_user()
    
    contacts = contacts_query.paginate(
      page=page,
      per_page=per_page,
      error_out=False      
    )
    
    return {
      "contacts": contacts_schema.dump(contacts.items),
      "total": contacts.total,
      "pages": contacts.pages,
      "current_page": contacts.page
    }, 200

class JobContacts(Resource):
  
  # GET /jobs/<job_id>/contacts
  @jwt_required()
  def get(self, job_id):
    job = ContactService.get_job_for_user(job_id)
    if not job:
      return {'errors': ['404 Job not found']}, 404
    
    contacts = Contact.query.filter_by(job_id=job.id).all()
    return contacts_schema.dump(contacts), 200
  
  # POST /jobs/<job_id>/contacts
  @jwt_required()
  def post(self, job_id):
    data = request.get_json()
    if not data:
      abort(400, description="Missing JSON data")
    
    contact, error = ContactService.create_contact(job_id, data)
    
    if error == "job_not_found":
      return {'errors': ['404 Job not found']}, 404
    if error == "invalid_data":
      return {'errors': ['400 Invalid data']}, 400
    return contact_schema.dump(contact), 201
  
  # PATCH /jobs/<job_id>/contacts/<contact_id>
  @jwt_required()
  def patch(self, job_id, contact_id):
    data = request.get_json()
    if not data:
      abort(400, description="Missing JSON data")
      
    # Validate job owner
    job = ContactService.get_job_for_user(job_id)
    if not job:
      return {'errors': ['404 Job not found']}, 404
    
    # Validate contact belongs to job
    contact = ContactService.get_contact_for_job(contact_id, job_id)
    if not contact:
      return {'errors': ['404 Contact not found']}, 404
    
    # Update Contact
    updated_contact = ContactService.update_contact(contact, data)
    if not updated_contact:
      return {'errors': ['400 Invalid data']}, 400
    return contact_schema.dump(updated_contact), 200
  
  # DELETE /jobs/<id>/contacts/<contact_id>
  @jwt_required()
  def delete(self, job_id, contact_id):
    job = ContactService.get_job_for_user(job_id)
    if not job:
      return {'errors': ['404 Job not found']}, 404
    
    contact = ContactService.get_contact_for_job(contact_id, job_id)
    if not contact:
      return {'errors': ['404 Contact not found']}, 404
    
    if not ContactService.delete_contact(contact):
      return {'errors': ['400 Could not delete contact']}, 400
    return {'message': 'Contact deleted successfully'}, 200