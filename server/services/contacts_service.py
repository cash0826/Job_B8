from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import get_jwt_identity
from config import db
from models.jobs import Job
from models.contacts import Contact

# Services controls SQL queries, commits and rollbacks
# Services controls ownership logic, nested validation and try/except blocks

class ContactService:
  
  @staticmethod
  def get_job_for_user(job_id):
    user_id = get_jwt_identity()
    job = Job.query.filter_by(id=job_id, user_id=user_id).first()
    return job
  
  @staticmethod
  def get_all_contacts_for_user():
    user_id = get_jwt_identity()
    return Contact.query.join(Job).filter(Job.user_id==user_id)
  
  @staticmethod
  def get_contact_for_job(contact_id, job_id):
    contact = Contact.query.filter_by(id=contact_id, job_id=job_id).first()
    return contact
  
  @staticmethod
  def create_contact(job_id, data):
    user_id = get_jwt_identity()
    job = Job.query.filter_by(id=job_id, user_id=user_id).first()
    if not job:
      return None, "job_not_found"
    
    contact = Contact(
      name=data.get('name'),
      email=data.get('email'),
      phone=data.get('phone'),
      job_id=job.id
    )
    
    try:
      db.session.add(contact)
      db.session.commit()
      return contact, None
    except IntegrityError:
      db.session.rollback()
      return None, "invalid_data"

  @staticmethod
  def update_contact(contact_id, data):
    contact = Contact.query.filter_by(id=contact_id).first()
    
    if not contact:
      return None, "contact_not_found"
    for key, value in data.items():
      setattr(contact, key, value)
    try:
      db.session.commit()
      return contact, None
    except IntegrityError:
      db.session.rollback()
      return None, "invalid_data"

  @staticmethod
  def delete_contact(contact_id):
    contact = Contact.query.filter_by(id=contact_id).first()
    if not contact:
      return None, "contact_not_found"
    
    try:
      db.session.delete(contact)
      db.session.commit()
      return True, None
    except IntegrityError:
      db.session.rollback()
      return False, "invalid_data"

# 401 Unauthorized handled by jwt_required
# 404 Not Found
# 400 Invalid data