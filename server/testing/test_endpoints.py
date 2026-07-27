from datetime import datetime
from flask_jwt_extended import decode_token

from models.users import User
from models.jobs import Job
from config import db


def test_signup_and_login_happy_path(app_client):
    signup_payload = {
        'name': 'Test User',
        'email': 'test@example.com',
        'password': 'password123',
        'image_url': 'https://example.com/avatar.png',
    }

    signup_response = app_client.post('/api/signup', json=signup_payload)
    assert signup_response.status_code == 200
    assert signup_response.is_json
    signup_data = signup_response.get_json()
    assert 'token' in signup_data

    access_token = signup_data['token']
    decoded = decode_token(access_token)
    assert decoded['sub'] == '1'

    login_payload = {
        'email': 'test@example.com',
        'password': 'password123',
    }
    login_response = app_client.post('/api/login', json=login_payload)
    assert login_response.status_code == 200
    login_data = login_response.get_json()
    assert login_data['user']["id"] == 1
    assert login_data['user']["email"] == 'test@example.com'
    assert 'token' in login_data


def test_login_fails_with_wrong_password(app_client):
    user = User(name='User Two', email='user2@example.com')
    user.password_hash = 'correcthorsebatterystaple'
    db.session.add(user)
    db.session.commit()

    response = app_client.post('/api/login', json={
        'email': 'user2@example.com',
        'password': 'wrongpassword',
    })

    assert response.status_code == 401
    assert response.is_json
    assert response.get_json() == {'errors': ['401 Unauthorized']}


def test_job_crud_lifecycle_requires_jwt(app_client):
    signup_payload = {
        'name': 'Job Test',
        'email': 'job@example.com',
        'password': 'jobpassword',
    }
    signup_response = app_client.post('/api/signup', json=signup_payload)
    token = signup_response.get_json()['token']
    auth_header = {'Authorization': f'Bearer {token}'}

    job_payload = {
        'title': 'Software Engineer',
        'company': 'Acme Co',
        'location': 'Remote',
        'url': 'https://acme.example.com/jobs/1',
        'description': 'Build great stuff',
        'status': 'Saved',
    }

    create_response = app_client.post('/api/jobs', headers=auth_header, json=job_payload)
    assert create_response.status_code == 201
    created_job = create_response.get_json()
    assert created_job['title'] == 'Software Engineer'
    assert created_job['company'] == 'Acme Co'
    assert created_job['status'] == 'Saved'

    index_response = app_client.get('/api/jobs', headers=auth_header)
    assert index_response.status_code == 200
    index_data = index_response.get_json()
    assert index_data['total'] == 1
    assert index_data['jobs'][0]['title'] == 'Software Engineer'

    delete_response = app_client.delete(f"/api/jobs/{created_job['id']}", headers=auth_header)
    assert delete_response.status_code == 200
    assert delete_response.get_json() == {'message': 'Job deleted successfully'}

    index_response_after = app_client.get('/api/jobs', headers=auth_header)
    assert index_response_after.status_code == 200
    assert index_response_after.get_json()['total'] == 0


def authorize_user(app_client, email='user@example.com', password='password123', name='Test User'):
    signup_payload = {
        'name': name,
        'email': email,
        'password': password,
    }
    signup_response = app_client.post('/api/signup', json=signup_payload)
    token = signup_response.get_json()['token']
    return {'Authorization': f'Bearer {token}'}


def create_job(app_client, headers):
    job_payload = {
        'title': 'Software Engineer',
        'company': 'Acme Co',
        'location': 'Remote',
        'url': 'https://acme.example.com/jobs/1',
        'description': 'Build great stuff',
        'status': 'Saved',
    }
    response = app_client.post('/api/jobs', headers=headers, json=job_payload)
    assert response.status_code == 201
    return response.get_json()


def test_job_requires_authentication(app_client):
    response = app_client.get('/api/jobs')
    assert response.status_code == 401
    assert response.is_json


def test_job_user_id_is_stored_as_integer(app_client):
    signup_payload = {
        'name': 'Integer User',
        'email': 'integer@example.com',
        'password': 'password123',
    }
    signup_response = app_client.post('/api/signup', json=signup_payload)
    token = signup_response.get_json()['token']
    headers = {'Authorization': f'Bearer {token}'}

    job_payload = {
        'title': 'Data Engineer',
        'company': 'Acme Co',
        'location': 'Remote',
        'url': 'https://acme.example.com/jobs/2',
        'description': 'Build data pipelines',
    }

    create_response = app_client.post('/api/jobs', headers=headers, json=job_payload)
    assert create_response.status_code == 201

    with app_client.application.app_context():
        created_job = Job.query.filter_by(title='Data Engineer').first()
        assert created_job is not None
        assert created_job.user_id == 1
        assert isinstance(created_job.user_id, int)


def test_checkjwtid_returns_current_user(app_client):
    headers = authorize_user(app_client, email='checkjwt@example.com', name='JWT User')
    response = app_client.get('/api/checkjwtid', headers=headers)

    assert response.status_code == 200
    data = response.get_json()
    assert data['email'] == 'checkjwt@example.com'
    assert data['name'] == 'JWT User'
    assert 'id' in data


def test_contacts_endpoints_work_for_job(app_client):
    headers = authorize_user(app_client, email='contacts@example.com', name='Contact User')
    job = create_job(app_client, headers)

    contact_payload = {
        'name': 'Jane Doe',
        'email': 'jane.doe@example.com',
    }
    create_response = app_client.post(f"/api/jobs/{job['id']}/contacts", headers=headers, json=contact_payload)
    assert create_response.status_code == 201
    created_contact = create_response.get_json()
    assert created_contact['name'] == 'Jane Doe'
    assert created_contact['email'] == 'jane.doe@example.com'

    job_contacts_response = app_client.get(f"/api/jobs/{job['id']}/contacts", headers=headers)
    assert job_contacts_response.status_code == 200
    assert job_contacts_response.get_json()[0]['name'] == 'Jane Doe'

    contacts_index_response = app_client.get('/api/contacts', headers=headers)
    assert contacts_index_response.status_code == 200
    assert contacts_index_response.get_json()['total'] == 1

    patch_response = app_client.patch(
        f"/api/jobs/{job['id']}/contacts/{created_contact['id']}",
        headers=headers,
        json={'name': 'Jane Smith'}
    )
    assert patch_response.status_code == 200
    assert patch_response.get_json()['name'] == 'Jane Smith'

    delete_response = app_client.delete(f"/api/jobs/{job['id']}/contacts/{created_contact['id']}", headers=headers)
    assert delete_response.status_code == 200
    assert delete_response.get_json() == {'message': 'Contact deleted successfully'}


def test_events_endpoints_work_for_job(app_client):
    headers = authorize_user(app_client, email='events@example.com', name='Event User')
    job = create_job(app_client, headers)

    event_payload = {
        'event': 'Interview',
        'scheduled_time': datetime(2026, 7, 16, 15, 0).isoformat(),
        'notes': 'Bring portfolio',
    }
    create_response = app_client.post(f"/api/jobs/{job['id']}/events", headers=headers, json=event_payload)
    assert create_response.status_code == 201
    created_event = create_response.get_json()
    assert created_event['event'] == 'Interview'
    assert created_event['notes'] == 'Bring portfolio'

    job_events_response = app_client.get(f"/api/jobs/{job['id']}/events", headers=headers)
    assert job_events_response.status_code == 200
    assert job_events_response.get_json()[0]['event'] == 'Interview'

    events_index_response = app_client.get('/api/events', headers=headers)
    assert events_index_response.status_code == 200
    assert events_index_response.get_json()['total'] == 1

    patch_response = app_client.patch(
        f"/api/jobs/{job['id']}/events/{created_event['id']}",
        headers=headers,
        json={'notes': 'Bring portfolio and slides'}
    )
    assert patch_response.status_code == 200
    assert patch_response.get_json()['notes'] == 'Bring portfolio and slides'

    delete_response = app_client.delete(f"/api/jobs/{job['id']}/events/{created_event['id']}", headers=headers)
    assert delete_response.status_code == 200
    assert delete_response.get_json() == {'message': 'Event deleted successfully'}


def test_documents_endpoints_work_for_job(app_client):
    headers = authorize_user(app_client, email='documents@example.com', name='Document User')
    job = create_job(app_client, headers)

    document_payload = {'type': 'Resume'}
    create_response = app_client.post(f"/api/jobs/{job['id']}/documents", headers=headers, json=document_payload)
    assert create_response.status_code == 201
    created_document = create_response.get_json()
    assert created_document['type'] == 'Resume'

    job_documents_response = app_client.get(f"/api/jobs/{job['id']}/documents", headers=headers)
    assert job_documents_response.status_code == 200
    assert job_documents_response.get_json()[0]['type'] == 'Resume'

    documents_index_response = app_client.get('/api/documents', headers=headers)
    assert documents_index_response.status_code == 200
    assert documents_index_response.get_json()['total'] == 1

    patch_response = app_client.patch(
        f"/api/jobs/{job['id']}/documents/{created_document['id']}",
        headers=headers,
        json={'type': 'Cover Letter'}
    )
    assert patch_response.status_code == 200
    assert patch_response.get_json()['type'] == 'Cover Letter'

    delete_response = app_client.delete(f"/api/jobs/{job['id']}/documents/{created_document['id']}", headers=headers)
    assert delete_response.status_code == 200
    assert delete_response.get_json() == {'message': 'Document deleted successfully'}
