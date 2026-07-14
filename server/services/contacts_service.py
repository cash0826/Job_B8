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
    
    contact = Contact(job_id=job_id, **data)
    try:
      db.session.add(contact)
      db.session.commit()
      return contact, None
    except IntegrityError:
      db.session.rollback()
      return None, "invalid_data"

  @staticmethod
  def update_contact(contact, data):
    for key, value in data.items():
      setattr(contact, key, value)
    try:
      db.session.commit()
      return contact
    except IntegrityError:
      db.session.rollback()
      return None

  @staticmethod
  def delete_contact(contact):
    try:
      db.session.delete(contact)
      db.session.commit()
      return True
    except IntegrityError:
      db.session.rollback()
      return False
  
# 401 Unauthorized handled by jwt_required
# 404 Not Found
# 400 Invalid data