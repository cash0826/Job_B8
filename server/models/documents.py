from config import db
from marshmallow import Schema, fields, validate

class Document(db.Model):
  __tablename__ = "documents"
  __table_args__ = {'extend_existing': True}
  
  id = db.Column(db.Integer, primary_key=True)
  type = db.Column(db.String, nullable=False)
  
  # Foreign key to join Jobs table
  job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
  
  # Belongs to a single job
  job = db.relationship('Job', back_populates='documents')
  
class DocumentSchema(Schema):
  id = fields.Int()
  type = fields.Str(required=True, validate=validate.Length(min=1))
  
  job = fields.Nested('JobSchema', exclude=('documents',))