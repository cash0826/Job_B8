from config import db
from marshmallow import Schema, fields

class Event(db.Model):
  __tablename__ = "events"
  __table_args__ = {'extend_existing': True}
  
  id = db.Column(db.Integer, primary_key=True)
  event = db.Column(db.String, nullable=False)
  scheduled_time = db.Column(db.DateTime, nullable=False)
  notes = db.Column(db.Text)
  
  # Foreign key to join jobs 
  job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
  
  # Many events belongs to a single Job
  job = db.relationship('Job', back_populates="events")
  
class EventSchema(Schema):
  id = fields.Int()
  event = fields.Str(load_default="Saved", dump_default="Saved")
  scheduled_time = fields.DateTime()
  notes = fields.Str()
  
  job = fields.Nested("JobSchema", exclude=("events",))