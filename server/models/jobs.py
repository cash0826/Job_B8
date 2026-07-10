from config import db
from marshmallow import Schema, fields, ValidationError
from .enums import JobStatus
from sqlalcheny.orm import validates

class Job(db.Model):
  __tablename__ = "jobs"
  __table_args__ = {'extend_existing': True}
  
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String, nullable=False)
  company = db.Column(db.String, nullable=False)
  location = db.Column(db.String)
  url = db.Column(db.String)
  description = db.Column(db.Text)
  status = db.Column(
    db.Enum(JobStatus),
    nullable=False,
    default=JobStatus.SAVED
  )
  
  # Foreign key to join Users table (Users.id)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  
  # Relationship Mapping: One-to-Many. Many Jobs belong to a single User
  user = db.relationship('User', back_populates="jobs")
  
  # Has (many) Events, Contacts and Associated Documents
  events = db.relationship('Event', back_populates="Job")
  contacts = db.relationship('Contact', back_populates="Job")
  associated_documents = db.relationship("Associated_Document", back_populates="Job")
  
  # Add default values and transition validation
  @validates("status")
  def validate_status(self, key, new_status):
    old_status = self.status
    
    # Allows initial assignment (e.g., creating a new job)
    if old_status is None:
      return new_status
    if not JobStatus.can_transition(old_status, new_status):
      raise ValueError(
        f"Invalid status transition: {old_status.value} → {new_status.value}"
      )
    return new_status

# Error handling
def status_validator(value):
  try:
    JobStatus(value)
  except ValueError:
    allowed = ", ".join([s.value for s in JobStatus])
    raise ValidationError(
      f"'{value}' is not a valid status. Allowed values: {allowed}"
    )

# Serialization/Deserialization
class JobSchema(Schema):
  id = fields.Int()
  title = fields.Str()
  company = fields.Str()
  location = fields.Str()
  url = fields.Url()
  description = fields.Str()
  status = fields.Enum(JobStatus)
  
  user = fields.Nested("UserSchema", exclude=("users",))

  # events = fields.List(fields.Nested("EventSchema", exclude="events"))
  # contacts = fields.List(fields.Nested("ContactSchema", exclude="contacts"))
  # associated_documents = fields.List(fields.Nested("AssociatedDocumentsSchema", exclude="associated_documents"))