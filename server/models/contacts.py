from config import db
from sqlalchemy.orm import validates
from marshmallow import Schema, fields, validate
import re

class Contact(db.Model):
  __tablename__ = "contacts"
  __table_args__ = {'extend_existing': True}
  
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  email = db.Column(db.String, nullable=False)
  phone_number = db.Column(db.String, nullable=True)
  
  # Foreign Key to join jobs table
  job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
  
  # Belongs to a single Job object
  job = db.relationship('Job', back_populates='contacts')

  # Name validation
  @validates("name")
  def validate_name(self, key, value):
      if not value or not value.strip():
          raise ValueError("Name cannot be empty.")
      return value

  # Email validation
  @validates
  def validate_email(self, key, address):
    if not isinstance (address, str):
      raise ValueError('Email must be a string')
    if '@' not in address:
      raise ValueError('Email must have @ in the address')
    return address

  # Phone number validation
  @validates("phone_number")
  def validate_phone(self, key, number):
    if number is None:
        return number

    # Basic phone validation: digits only, optional + at start
    pattern = r"^\+?\d{7,15}$"
    if not re.match(pattern, number):
        raise ValueError("Phone number must be 7–15 digits, optional leading +.")
    return number  

class ContactSchema(Schema):
  id = fields.Int()
  name = fields.Str(required=True, validate=validate.Length(min=1))
  email = fields.Str(required=True)
  phone_number = fields.Str(
    validate=validate.Regexp(
      r"^\+?\d{7,15}$",
      error="Phone number must be 7–15 digits, optional leading +."
    )
  )
  
  job = fields.Nested('JobSchema', exclude=('contacts',))