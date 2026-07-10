from config import app, api
from models import User, Job, Contact, Event, Contact, AssociatedDocument

if __name__ == "__main__":
  app.run(debug=True, port=5555)