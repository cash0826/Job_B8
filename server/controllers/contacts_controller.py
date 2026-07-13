from config import db
from flask import request
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import IntegrityError
from models.contacts import Contact, ContactSchema

# global contact schema instance for serialization
contact_schema = ContactSchema()
contacts_schema = ContactSchema(many=True)

class Contacts(Resource):
  
  # GET /contacts
  @jwt_required()
  def get(self):
    user_id = get_jwt_identity()
    
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    contacts = Contact.query.filter_by(user_id=user_id).paginate(
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
  
  # POST /events
  @jwt_required()
  def post(self):
    pass