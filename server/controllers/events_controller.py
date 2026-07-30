from flask import request, abort
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from services.events_service import EventService
from models.events import Event, EventSchema

# global event schema instance for serialization
event_schema = EventSchema()
events_schema = EventSchema(many=True)

class Events(Resource):
    
  # GET /events
  @jwt_required()
  def get(self):
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    # Query all events for authenticated user
    events_query = EventService.get_all_events_for_user()
    
    events = events_query.paginate(
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
    
  # POST /events
  @jwt_required()
  def post(self):
    data = request.get_json()
    if not data:
      abort(400, description="Missing JSON data")
          
    job_id = data.get('job_id')
    event, error = EventService.create_event(job_id=job_id, data=data)
    
    if error == "job_not_found":
      return {'errors': ['404 Job not found']}, 404
    if error == "invalid_data":
      return {'errors': ['400 Invalid data']}, 400
    return event_schema.dump(event), 201
