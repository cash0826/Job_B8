from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import get_jwt_identity
from config import db
from models.jobs import Job
from models.documents import Document

# Services controls SQL queries, commits and rollbacks
# Services controls ownership logic, nested validation and try/except blocks

class DocumentService:
  
  @staticmethod
  def get_job_for_user(job_id):
    user_id = get_jwt_identity()
    job = Job.query.filter_by(id=job_id, user_id=user_id).first()
    return job
  
  @staticmethod
  def get_all_documents_for_user():
    user_id = get_jwt_identity()
    return Document.query.join(Job).filter(Job.user_id==user_id)
  
  @staticmethod
  def get_document_for_job(document_id, job_id):
    document = Document.query.filter_by(id=document_id, job_id=job_id).first()
    return document
  
  @staticmethod
  def create_document(job_id, data):
    user_id = get_jwt_identity()
    job = Job.query.filter_by(id=job_id, user_id=user_id).first()
    if not job:
      return None, "job_not_found"
    
    document = Document(
      type=data.get('type'),
      job_id=job.id
    )
    
    try:
      db.session.add(document)
      db.session.commit()
      return document, None
    except IntegrityError:
      db.session.rollback()
      return None, "invalid_data"
  
  @staticmethod
  def update_document(document_id, data):
    document = Document.query.filter_by(id=document_id).first()
    
    if not document:
      return None, "document_not_found"
    for key, value in data.items():
      setattr(document, key, value)
    try:
      db.session.commit()
      return document, None
    except IntegrityError:
      db.session.rollback()
      return None, "invalid_data"
    
  @staticmethod
  def delete_document(document_id):
    document = Document.query.filter_by(id=document_id).first()
    if not document:
      return None, "document_not_found"
    
    try:
      db.session.delete(document)
      db.session.commit()
      return True, None
    except IntegrityError:
      db.session.rollback()
      return False, "invalid_data"
    
# 401 Unauthorized handled by jwt_required
# 404 Not Found
# 400 Invalid data