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
    
  # POST /contacts
  @jwt_required()
  def post(self):
    data = request.get_json()
    if not data:
      abort(400, description="Missing JSON data")
    
    job_id = data.get('job_id')
    contact, error = ContactService.create_contact(job_id=job_id, data=data)
    
    if error == "job_not_found":
      return {'errors': ['404 Job not found']}, 404
    if error == "invalid_data":
      return {'errors': ['400 Invalid data']}, 400
    return contact_schema.dump(contact), 201
  
  # PATCH /contacts/<id>
  @jwt_required()
  def patch(self, id):
    data = request.get_json()
    if not data:
      abort(400, description="Missing JSON data")
    
    contact, error = ContactService.update_contact(contact_id=id, data=data)
    
    if error == "contact_not_found":
      return {'errors': ['404 Contact not found']}, 404
    if error == "invalid_data":
      return {'errors': ['404 Invalid data']}, 400
    return contact_schema.dump(contact), 201
  
  # DELETE /contacts/<id>
  @jwt_required()
  def delete(self, id):
    contact, error = ContactService.delete_contact(contact_id=id)
    
    if error == "contact_not_found":
      return {'errors': ['404 Contact not found']}, 404
    if error == "invalid_data":
      return {'errors': ['404 Invalid data']}, 400    
    if contact:
      return {'message': 'Contact deleted successfully'}, 200