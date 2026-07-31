from datetime import datetime
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import get_jwt_identity
from config import db
from models.jobs import Job
from models.events import Event

# Services controls SQL queries, commits and db rollbacks
# Services controls ownership logic, nested validation and try/except blocks

class EventService:
  
  @staticmethod
  def get_job_for_user(job_id):
    user_id = get_jwt_identity()
    job = Job.query.filter_by(id=job_id, user_id=user_id).first()
    return job
  
  @staticmethod
  def get_all_events_for_user():
    user_id = get_jwt_identity()
    return Event.query.join(Job).filter(Job.user_id==user_id)
  
  @staticmethod
  def get_events_for_job(event_id, job_id):
    events = Event.query.filter_by(id=event_id, job_id=job_id).all()
    return events
  
  @staticmethod
  def create_event(job_id, data):
    user_id = get_jwt_identity()
    job = Job.query.filter_by(id=job_id, user_id=user_id).first()
    if not job:
      return None, "job_not_found"
    
    if 'scheduled_time' in data and isinstance(data['scheduled_time'], str):
      data['scheduled_time'] = datetime.fromisoformat(data['scheduled_time'])

    event = Event(
      event=data.get('event'),
      scheduled_time=data.get('scheduled_time'),
      notes=data.get('notes'),
      job_id=job.id
    )
    
    try:
      db.session.add(event)
      db.session.commit()
      return event, None
    except IntegrityError:
      db.session.rollback()
      return None, "invalid_data"
    
  @staticmethod
  def update_event(event_id, data):
    event = Event.query.filter_by(id=event_id).first()
    
    if not event:
      return None, "event_not_found"
    for key, value in data.items():
      if key == "scheduled_time":
        try:
          value = datetime.fromisoformat(value)  # convert string → datetime
        except ValueError:
          return None, "invalid_data"
      setattr(event, key, value)
    try:
      db.session.commit()
      return event, None
    except IntegrityError:
      db.session.rollback()
      return None, "invalid_data"
    
  @staticmethod
  def delete_event(event_id):
    event = Event.query.filter_by(id=event_id).first()
    if not event:
      return False, "event_not_found"
  
    try:
      db.session.delete(event)
      db.session.commit()
      return True, None
    except IntegrityError:
      db.session.rollback()
      return False, "invalid_data"
    
# 401 Unauthorized handled by jwt_required
# 404 Not Found
# 400 Invalid data