from config import db
from flask import request, jsonify, make_response
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import IntegrityError
from models.events import Event, EventSchema

# global event schema instance for serialization
event_schema = EventSchema()
events_schema = EventSchema(many=True)

class Event(Resource):
  
  # GET /events
  @jwt_required()
  def get(self):
    user_id = get_jwt_identity()
    
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    events = Event.query.filter_by(user_id=user_id).paginate(
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
    user_id = get_jwt_identity()
    data = request.get_json()
    try:
      event = Event(
        title=data.get('title'),
        date=data.get('date'),
        location=data.get('location'),
        description=data.get('description'),
        user_id=user_id
      )
      db.session.add(event)
      db.session.commit()
      return event_schema.dump(event), 201
    except IntegrityError:
      db.session.rollback()
      return {'errors': ['400 Invalid data']}, 400
    
  # PATCH /events/>id>
  @jwt_required
  def patch(self, id):
    user_id = get_jwt_identity()
    data = request.get_json()
    event = Event.query.filter_by(id=id, user_id=user_id).first()
    
    if not event:
      return {'errors': ['404 Event not found']}, 404
    for key, value in data.items():
      setattr(event, key, value)
    try:
      db.session.commit()
      return event_schema.dump(event), 200
    except IntegrityError:
      db.session.rollback()
      return {'errors': ['400 Invalid data']}, 400
  
  # DELETE /events/<id>
  @jwt_required
  def delete(self, id):
    user_id = get_jwt_identity()
    event = Event.query.filter_by(id=id, user_id=user_id).first()
    
    if not event:
      return {'errors': ['404 Event not found']}, 404
    db.session.delete(event)
    db.session.commit()
    
    return {'message': 'Event deleted successfully'}, 200