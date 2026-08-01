from flask import request, abort
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from services.documents_service import DocumentService
from models.documents import Document, DocumentSchema

# global schema instances for serialization
document_schema = DocumentSchema()
documents_schema = DocumentSchema(many=True)

class Documents(Resource):
    
  # GET /documents
  @jwt_required()
  def get(self):
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    # Query all associated documents for authenticated user
    documents_query = DocumentService.get_all_documents_for_user()
    
    documents = documents_query.paginate(
      page=page,
      per_page=per_page,
      error_out=False
    )
    
    return {
      "documents": documents_schema.dump(documents.items),
      "total": documents.total,
      "pages": documents.pages,
      "current_page": documents.page
    }, 200

  # POST /documents
  @jwt_required()
  def post(self):
    data = request.get_json()
    if not data:
      abort(400, description="Missing JSON data")
    
    job_id = data.get('job_id')
    document, error = DocumentService.create_document(job_id=job_id, data=data)
    
    if error == "job_not_found":
      return {'errors': ['404 Job not found']}, 404
    if error == "invalid_data":
      return {'errors': ['400 Invalid data']}, 400
    return document_schema.dump(document), 201
  
  # PATCH /document/<id>
  @jwt_required()
  def patch(self, id):
    data = request.get_json()
    if not data:
      abort(400, description="Missing JSON data")
    
    document, error = DocumentService.update_document(document_id=id, data=data)
    
    if error == "document_not_found":
      return {'errors': ['404 Document not found']}, 404
    if error == "invalid_data":
      return {'errors': ['404 Invalid data']}, 400
    return document_schema.dump(document), 201
  
  # DELETE /document/<id>
  @jwt_required()
  def delete(self, id):
    document, error = DocumentService.delete_document(document_id=id)
    
    if error == "document_not_found":
      return {'errors': ['404 Document not found']}, 404
    if error == "invalid_data":
      return {'errors': ['404 Invalid data']}, 400
    if document:
      return {'message': 'Document deleted successfully'}, 200
