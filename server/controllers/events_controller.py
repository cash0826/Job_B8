from flask import request, abort
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from services.events_service import EventService
from models.events import Event, EventSchema

# global event schema instance for serialization
event_schema = EventSchema()
events_schema = EventSchema(many=True)

class Events(Resource):
  
  # GET /jobs/<job_id>/events
  @jwt_required()
  def get(self, job_id):    
    job = EventService.get_job_for_user(job_id)
    if not job:
      return {'errors': ['404 Job not found']}, 404
    
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    events = Event.query.filter_by(job_id=job.id).paginate(
      page=page, 
      per_page=per_page, 
      error_out=False
    )
    return {
      "events": events_schema.dump(events.items),
      "total": events.total,
      "pages": events.pages,
      "current_page": events.page
    }, 200
  
  # POST /jobs/<id>/events
  @jwt_required()
  def post(self, job_id):
    data = request.get_json()
    if not data:
      abort(400, description="Missing JSON data")
    
    event, error = EventService.create_event(job_id, data)
    
    if error == "job_not_found":
      return {'errors': ['404 Job not found']}, 404
    if error == "invalid_data":
      return {'errors': ['400 Invalid data']}, 400
    return event_schema.dump(event), 201
    
  # PATCH /jobs/<job_id>/events/<event_id>
  @jwt_required()
  def patch(self, job_id, event_id):
    data = request.get_json()
    if not data:
      abort(400, description="Missing JSON data")
    
    # Validate job owner
    job = EventService.get_job_for_user(job_id)
    if not job:
      return {'errors': ['404 Job not found']}, 404
    
    # Validated event belongs to job
    event = EventService.get_event_for_job(event_id, job_id)
    if not event:
      return {'errors': ['404 Event not found']}, 404
    
    # Update Event
    updated_event = EventService.update_event(event, data)
    if not updated_event:
      return {'errors': ['400 Invalid data']}, 400
    return event_schema.dump(updated_event), 200
  
  # DELETE /jobs/<id>/events/<id>
  @jwt_required()
  def delete(self, job_id, event_id):
    job = EventService.get_job_for_user(job_id)
    if not job:
      return {'errors': ['404 Job not found']}, 404
    
    event = EventService.get_event_for_job(event_id, job_id)
    if not event: 
      return {'errors': ['404 Event not found']}, 404
    
    if not EventService.delete_event(event):
      return {'errors': ['400 Could not delete event']}, 400
    
    return {'message': 'Event deleted successfully'}, 200