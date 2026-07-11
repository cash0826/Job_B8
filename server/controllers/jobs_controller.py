from config import db
from flask import request, jsonify, make_response
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import IntegrityError
from models.jobs import Job, JobSchema

# global job schema instance for serialization
job_schema = JobSchema()

class JobDashboard(Resource):
  
  # GET /jobs
  @jwt_required()
  def get(self):
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    jobs = Job.query.paginate(page=page, per_page=per_page, error_out=False)
    return {
      "jobs": JobSchema(many=True).dump(jobs.items),
      "total": jobs.total,
      "pages": jobs.pages,
      "current_page": jobs.page
    }
  
  # POST /jobs
  @jwt_required()
  def post(self):
    request_json = request.get_json()
    try:
      job = Job(
        title=request_json.get('title'),
        company=request_json.get('company'),
        location=request_json.get('location'),
        url=request_json.get('url'),
        description=request_json.get('description'),
        status=request_json.get('status'),
        user_id=get_jwt_identity()
      )
      db.session.add(job)
      db.session.commit()
    except IntegrityError:
      db.session.rollback()
      return {'errors': ['400 Invalid data']}, 400
  
  # PATCH /jobs/<id>
  @jwt_required()
  def patch(self, id):
      request_json = request.get_json()
      
      job = Job.query.filter_by(id=id, user_id=get_jwt_identity()).first()
      
      if job:
        for key in request_json:
          setattr(job, key, request_json[key])
        try:
          db.session.commit()
          return job_schema.dump(job), 200
        except IntegrityError:
          db.session.rollback()
          return {'errors': ['400 Invalid data']}, 400
        
  # DELETE /jobs/<id>
  @jwt_required()
  def delete(self, id):
    job = Job.query.filter_by(id=id, user_id=get_jwt_identity()).first()
    
    if job:
      db.session.delete(job)
      db.session.commit()
      return {'message': 'Job deleted successfully'}, 200
    else:
      return {'errors': ['404 Job not found']}, 404