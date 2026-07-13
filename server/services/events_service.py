from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import get_jwt_identity
from config import db
from models.jobs import Job
from models.events import Event

# Services controls SQL queries, commits and rollbacks
# Services controls ownership logic, nested validation and try/except blocks

class EventService:
  
  @staticmethod
  def get_job_for_user(job_id):
    user_id = get_jwt_identity()
    job = Job.query.filter_by(id=job_id, user_id=user_id).first()
    if not job:
      return None
    return job
  
  @staticmethod
  def get_event_for_job(event_id, job_id):
    event = Event.query.filter_by(id=event_id, job_id=job_id).first()
    if not event:
      return None
    return event
  
  @staticmethod
  def create_event(job_id, data):
    user_id = get_jwt_identity()
    job = Job.query.filter_by(id=job_id, user_id=user_id).first()
    if not job:
      return None, "job_not_found"
    
    event = Event(job_id=job_id, **data)
    try:
      db.session.add(event)
      db.session.commit()
      return event, None
    except IntegrityError:
      db.session.rollback()
      return None, "invalid_data"
    
  @staticmethod
  def update_event(event, data):
    for key, value in data.items():
      setattr(event, key, value)
    try:
      db.session.commit()
      return event
    except IntegrityError:
      db.session.rollback()
      return None
    
  @staticmethod
  def delete_event(event):
    try:
      db.session.delete(event)
      db.session.commit()
      return True
    except IntegrityError:
      db.session.rollback()
      return False
    
# 401 Unauthorized handled by jwt_required
# 404 Not Found
# 400 Invalid data