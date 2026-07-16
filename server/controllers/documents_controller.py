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

class JobDocuments(Resource):
    
  # GET /jobs/<job_id>/documents
  @jwt_required()
  def get(self, job_id):
    job = DocumentService.get_job_for_user(job_id)
    if not job:
      return {'errors': ['404 Job not found']}, 404
    
    documents = Document.query.filter_by(job_id=job.id).all
    return documents_schema.dump(documents), 200
  
  # POST /jobs/<job_d>/documents
  @jwt_required()
  def post(self, job_id):
    data = request.get_json()
    if not data:
      abort(400, description="Missing JSON data")
    
    document, error = DocumentService.create_document(job_id, data)
    
    if error == "job_not_found":
      return {'errors': ['404 Job not found']}, 404
    if error == "invalid_data":
      return {'errors': ['400 Invalid data']}, 400
    return documents_schema.dump(document), 201
  
  # PATCH /jobs/<job_id/documents/<document_id>
  @jwt_required()
  def patch(self, job_id, document_id):
    data = request.get_json()
    if not data:
      abort(400, description="Missing JSON data")
    
    # Validate job owner
    job = DocumentService.get_job_for_user(job_id)
    if not job:
      return {'errors': ['404 Job not found']}, 404
    
    # Validate document belongs to job
    document = DocumentService.get_document_for_job(document_id, job_id)
    if not document:
      return {'error': ['404 Document not found']}, 404
    
    # Update Document
    updated_document = DocumentService.update_document(document, data)
    if not updated_document:
      return {'errors': ['400 Invalid data']}, 400
    return document_schema.dump(updated_document), 200
  
  # DELETE /jobs/<job_id>/documents/<document_id>
  @jwt_required()
  def delete(self, job_id, document_id):
    job = DocumentService.get_job_for_user(job_id)
    if not job:
      return {'errors': ['404 Job not found']}, 404
    
    document = DocumentService.get_document_for_job(document_id, job_id)
    if not document:
      return {'errors': ['404 Document not found']}, 404
    
    if not DocumentService.delete_document(document):
      return {'errors': ['400 Could not delete document']}, 400
    return {'message': 'Document deleted successfully'}, 200
  