from config import db
from sqlalchemy.orm import validates
from marshmallow import Schema, fields

class Contact(db.Model):
  __tablename__ = "contacts"
  __table_args__ = {'extend_existing': True}
  
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  email = db.Column(db.String, nullable=False)
  
  # Foreign Key to join jobs table
  job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
  
  # Belongs to a single Job object
  job = db.relationship('Job', back_populates='contacts')

  # Email validation
  @validates
  def validate_email(self, key, address):
    if not isinstance (address, str):
      raise ValueError('Email must be a string')
    if '@' not in address:
      raise ValueError('Email must have @ in the address')
    return address

class ContactSchema(Schema):
  id = fields.Int()
  name = fields.Str()
  email = fields.Str()
  
  job = fields.List(fields.Nested('JobSchema', exclude=('contacts',)))