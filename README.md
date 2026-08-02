# Job_B8
This is full-stack, React + Flask productivity app to view and keep track of jobs as you are applying to them.

## Description
This application will centralize all of your job applications to a single view, save job details such as titles and descriptions, keep important dates upfront, and store a relevant contact list. 

## Technologies Used  

**Backend**: Python, Pipenv, Flask, Flask-Migrate, Flask-Restful, Flask-Bcrypt, Flask-SQLAlchemy, Flask-JWT-Extended, Bcrypt, Marshmallow, Faker

**Frontend**: JavaScript, Node.js, Vite, React, React Router, eslint, Tailwind CSS, Tailwind Heroicons, date-fns

### API (if used)  

- API was not used due to time constraints.

## Installation / Set Up Instructions

1. Fork or Clone this repository from GitHub.
  ```
  git clone <repository-url>
  cd Job_B8
  ```

2. Install Dependencies.\ 
Change into the server directory `cd server`. Run `pipenv install` to create your virtual environment and install dependencies. Run `pipenv shell` to enter the virtual environment.\
Change into the client directory and install node dependencies for the frontend. Run `npm install --prefix client` OR `cd ..`, `cd client` and `npm install`

  Alternative commands:
  ```
  pipenv install && pipenv shell
  npm install --prefix client
  ```
  
3. Configure Flask App. Change to the server directory and configure the the Flask App environment variables:
    ```
    cd server
    export FLASK_APP=app.py
    export FLASK_RUN_PORT=5555
    ```
    Use **set** instead of export if on Window OS.
  
4. Create and seed the database. Ensure that you are in the server directory and run:
  ```
  flask db init
  flask db migrate -m "initial migration"
  flask db upgrade head
  python seed.py
  ```
  
5. To open and view the backend, ensure that you are in the server directory and run:
  ```
  python app.py
  ```

6. Run React in another terminal from the client directory:
  ```bash
  npm run dev
  ```
  To use a seeded user for login, access the app.db instance, select a user, and login with their associated email.  
  The password is the user's name in lowercase + "password". 

7. Run testing from pipenv (server-side only)
    ```
    pytest -q
    ```
    **Note** Running tests will also drop SQL tables. To continue using the development server, reinitialize and seed the database.
  
## General Overview
1. SQL Data Models, API Endpoints, and React Components.
2. Integrates user authentication, ownership-based access controls and relational resources with full CRUD functionality.
3. Asynchronous communication between frontend and backend.
4. Manages application state, loading/error handling, and persistence.
5. Clean, modular, and reuseable code.
6. Reporting feature on user's dashboard.

## Key Features
1. Reporting feature on primary home page. Dashboard includes key indicators to keep count of total jobs saved on app, count on jobs that have been applied to, are in interviewing phase, and has received job offer.
2. Responsive Navbar: if on a wider screen, the app will render a collapsible sidebar. On a narrow screen, the app will render a menu icon can toggle the sidebar
3. Helpful "Updated" alerts when updating a job status. 
4. Colorful alert badges for upcoming events: today, tomorrow, this week.
5. Consistent page design and intuitive "add" buttons on all resource-related pages. 

## Known Challenges or Limitations
- No Signup form and page developed (as recommended for scope of this project).
- No external API incorporated. An external API such as LinkedIn or Monster could help add jobs to the dashboard.
- Documents was not added as part of the front end. It was developed in the backend only.  
- Calendar for Events was not developed (it was attempted but left as a grid for now).  
- CRUD: Update UI missing for contacts/events. Fullly functional backend and service layer set up already, but missing buttons and UI design. 

## Other small features to include
- When job status is "Not Selected" remove from dashboard, but keep in backend.  
- Search function can be added to dashboard.
- Improve color schemas and branding to make app more unique.
    
## Deployment Link
- App not deployed yet.  

## Acknowledgements
- Tailwind CSS and MS Copilot AI for assistance with page design and occasional debugging. 
- All technologies listed above.