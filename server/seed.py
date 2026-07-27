from random import choice
from faker import Faker
from config import app, db
from models import User, Job, Contact, Event, Contact, Document

fake = Faker()

with app.app_context():
  # Delete all rows in current tables
  print("Deleting all records...")
  User.query.delete()
  Job.query.delete()
  Contact.query.delete()
  Event.query.delete()
  Document.query.delete()
  
  # Creates 5 Users
  print("Creating 5 test accounts...")
  users = []
  for i in range(5):
    name = fake.unique.first_name()
    email = name.lower() + '@email.com'
    password = name.lower() + 'password'
    user=User(
      name=name,
      email=email,
    )
    user.password_hash = password
    users.append(user)
  db.session.add_all(users)
  db.session.commit()
  
  # Creates Job Postings
  print("Creating 20 test job postings...")  
  jobs = []
  for i in range(20):
    job_status = choice(['SAVED', 'APPLIED', 'NOT_SELECTED', 'ASSESSMENT', 'INTERVIEWING', 'JOB_OFFER'])
    job = Job(
      title=fake.job(),
      company=fake.company(),
      location=fake.city(),
      url=fake.url(),
      description=fake.paragraph(nb_sentences=2),
      status=job_status
    )
    job.user = choice(users)
    jobs.append(job)
  db.session.add_all(jobs)
  db.session.commit()
  
  # Creates Contacts
  print("Creating 30 test contacts...")
  contacts = []
  for i in range(30):
    contact_first_name = fake.first_name()
    contact_last_name = fake.last_name()
    name = contact_first_name + ' ' + contact_last_name
    email = contact_first_name.lower() + '@recruiteremail.com'
    
    contact = Contact(
      name=name,
      email=email,
    )
    
    contact.job = choice(jobs)
    contacts.append(contact)
  db.session.add_all(contacts)
  db.session.commit()
  
  # Create Event
  print("Creating 30 test events...")
  events = []
  for i in range(30):
    event_type = choice(['HR Interview', 'Assessment', 'Meeting', 'Follow-Up'])
    notes = fake.sentence(nb_words=5)
    event = Event(
      event=event_type,
      scheduled_time=fake.future_datetime(),
      notes=notes
    )
    event.job = choice(jobs)
    events.append(event)
  db.session.add_all(events)
  db.session.commit()
  
  # Create AssociateDocument
  print("Creating 30 documents...")
  documents = []
  for i in range(30):
    doc_type = choice(['Cover Letter', 'Resume', 'Job Offer', 'Job Contract'])
    document = Document(
      type = doc_type
    )
    document.job = choice(jobs)
    documents.append(document)
  db.session.add_all(documents)
  db.session.commit()
  print("Database seeded successfully! 🌱")