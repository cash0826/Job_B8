from config import db
from flask import request, jsonify, make_response
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import IntegrityError
from models.jobs import Job, JobSchema

# global job schema instance for serialization
job_schema = JobSchema()
jobs_schema = JobSchema(many=True)

class JobDashboard(Resource):
  
  # GET /jobs
  @jwt_required()
  def get(self):
    user_id = get_jwt_identity()
    
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    jobs = Job.query.filter_by(user_id=user_id).paginate(
      page=page, 
      per_page=per_page, 
      error_out=False
    )
    return {
      "jobs": jobs_schema.dump(jobs.items),
      "total": jobs.total,
      "pages": jobs.pages,
      "current_page": jobs.page
    }, 200
    
  
  # POST /jobs
  @jwt_required()
  def post(self):
    user_id = get_jwt_identity()
    data = request.get_json()
    try:
      job = Job(
        title=data.get('title'),
        company=data.get('company'),
        location=data.get('location'),
        url=data.get('url'),
        description=data.get('description'),
        status=data.get('status'),
        user_id=user_id
      )
      db.session.add(job)
      db.session.commit()
      return job_schema.dump(job), 201
    except IntegrityError:
      db.session.rollback()
      return {'errors': ['400 Invalid data']}, 400
  
  # PATCH /jobs/<id>
  @jwt_required()
  def patch(self, id):
    user_id = get_jwt_identity()
    data = request.get_json()
    
    job = Job.query.filter_by(id=id, user_id=user_id()).first()
    
    if not job:
      return {'errors': ['404 Job not found']}, 404
    for key, value in data.items():
      setattr(job, key, value)
    try:
      db.session.commit()
      return job_schema.dump(job), 200
    except IntegrityError:
      db.session.rollback()
      return {'errors': ['400 Invalid data']}, 400
        
  # DELETE /jobs/<id>
  @jwt_required()
  def delete(self, id):
    user_id = get_jwt_identity()
    job = Job.query.filter_by(id=id, user_id=user_id).first()
    
    if not job:
      return { 'errors': ['404 Job not found']}, 404
      
    db.session.delete(job)
    db.session.commit()
    
    return {'message': 'Job deleted successfully'}, 200