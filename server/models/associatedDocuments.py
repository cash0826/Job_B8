from config import db
from marshmallow import Schema, fields

class AssociatedDocument(db.Model):
  __tablename__ = "associated_documents"
  __table_args__ = {'extend_existing': True}
  
  id = db.Column(db.Integer, primary_key=True)
  type = db.Column(db.String, nullable=False)
  
  # Foreign key to join Jobs table
  job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
  
  # Belongs to a single job
  job = db.relationship('Job', back_populates='associated_documents')
  
class AssociatedDocumentSchema(db.Model):
  id = fields.Int()
  type = fields.Str()
  
  job = fields.Nested('JobSchema', exclude=('associated_documents'))