from config import db, bcrypt
from datetime import datetime
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import Schema, fields

class User(db.Model):
  __tablename__ = "users"
  __table_args__ = {'extend_existing': True}
  
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  email = db.Column(db.String, unique=True, nullable=False)
  _password_hash = db.Column(db.String, nullable=False)
  image_url = db.Column(db.String)
  created_at = db.Column(db.DateTime, default=datetime)
  
  # Has (many) Jobs
  jobs = db.relationship('Job', back_populates='user', cascade='all, delete-orphan')
  
  # Email validation
  @validates
  def validate_email(self, key, address):
    if not isinstance (address, str):
      raise ValueError('Email must be a string')
    if '@' not in address:
      raise ValueError('Email must have @ in the address')
    return address
  
  @hybrid_property
  def password_hash(self):
    raise AttributeError('Password hashes may not be viewed')
  
  @password_hash.setter
  def password_hash(self, password):
    password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
    self._password_hash = password_hash.decode('utf-8')
  
  def authenticate(self, password):
    return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
  
class UserSchema(Schema):
  id = fields.Int()
  name = fields.String()
  email = fields.String()
  image_url = fields.String()
  
  jobs = fields.List(fields.Nested("JobSchema", exclude=('jobs',)))