from config import db
from marshmallow import Schema, fields

class Job(db.Model):
  __tablename__ = "jobs"
  
  
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String, nullable=False)
  company = db.Column(db.String, nullable=False)
  location = db.Column(db.String)
  url = db.Column(db.String)
  description = db.Column(db.Text)
  status = db.Column(
    db.Enum('Saved', 'Applied', 'Not Selected', 'Assessment', 'Interviewing', 'Job Offer'),
    nullable=False
  )
  
  # Foreign key to join User
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
  
  # Relationship Mapping: One-to-Many. Many Jobs belog to a single User
  user = db.relationship('User', back_populates="jobs")
  
  # Has (many) Events, Contacts and Associated Documents
  events = db.relationship('Event', back_populates="Job")
  contacts = db.relationship('Contact', back_populates="Job")
  associated_documents = db.relationship("Associated_Documents", back_populates="Job")

class JobSchema(Schema):
  id = fields.Int()
  title = fields.Str()
  company = fields.Str()
  location = fields.Str()
  url = fields.Url()
  description = fields.Str()
  status = fields.Enum()
  
  user = fields.Nested("UserSchema", exclude=("users",))

  events = fields.List(fields.Nested("EventSchema", exclude="events"))
  contacts = fields.List(fields.Nested("ContactSchema", exclude="contacts"))
  associated_documents = fields.List(fields.Nested("AssociatedDocumentsSchema", exclude="associated_documents"))