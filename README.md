# Job_B8
This is full-stack, React + Flask productivity app to view and keep track of jobs as you are applying to them.

## Description
This application will centralize all of your job applications to a single view, save job details such as titles and descriptions, keep important dates upfront, and store a relevant contact list. 

## Technologies Used  

**Backend**: Python, Pipenv, Flask, Flask-Migrate, Flask-Restful, Flask-Bcrypt, Flask-SQLAlchemy, Flask-JWT-Extended, Bcrypt, Marshmallow, Faker

**Frontend**: JavaScript, Node.js, Vite, React, React Router, eslint, Tailwind CSS, Tailwind Heroicons, date-fns

### API (if used)
- API was not used due to time constraints.

## Basic Installation
1. Fork or Clone this repository from GitHub.
    ```
    git clone <repository-url>
    cd Job_B8
    ```
  
2. Set up server. From your terminal and the project root, run:
    ```
    cd server
    pipenv install
    pipenv shell
    export FLASK_APP=app.py
    export FLASK_RUN_PORT=5555
    ```
    Use **set** instead of export if running on Windows OS
  
3. Set up client. On a new terminal and from the project root, run:
    ```
    cd client
    npm install
    npm run dev
    ```

## Set Up Instructions

1. Ensure db has been initialized and the database has been seeded.
    ```
    flask db init
    flask db migrate -m "initial migration"
    flask db seed.py
    ```
    To use a seeded user for login, access the app.db instance, select a user, and login with their associated email.  
    The password is the user's name in lowercase + "password".  
  
2. Run testing from pipenv (server-side only)
    ```
    pytest -q
    ```
    **Note** Running pytest will also drop SQL tables. Reinitialize flask db if you run the tests.
    
3. Run server from pipenv
    ```
    python app.py
    ```
  
## Overview of Functionality/Features

1. SQL Data Models, API Endpoints, and React Components.
2. Integrates user authentication, ownership-based access controls and relational resources with full CRUD functionality.
3. Asynchronous communication between frontend and backend.
4. Manages application state, loading/error handling, and persistence.
5. Clean, modular, and reuseable code.
6. Reporting feature on user's dashboard.

## Known Challenges or Limitations
- No Signup form and page developed (as recommended for scope of this project).
- No external API incorporated. An external API such as LinkedIn or Monster could help add jobs to the dashboard.
- Documents was not added as part of the front end. It was developed in the backend only.  
- Calendar for Events was not developed (it was attempted but left as a grid for now).  
- CRDU: Update UI missing for contacts/events. Fullly functional backend and service layer set up already, but missing buttons and UI design. 

## Other small features to include
- When job status is "Not Selected" remove from dashboard, but keep in backend.  
- Search function can be added to dashboard.
    
## Deployment Link
- App not deployed yet.  

## Acknowledgements
- Tailwind CSS and MS Copilot AI for assistance with page design and occasional debugging. 
- All technologies listed above.