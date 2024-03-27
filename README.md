# SWE
Group SWE Repo.
Due to issues with submission, our submitted branch is docs.
To access it, run git clone -b docs LINK
To access our fully working version, run: 
git clone -b mainv3 LINK.

Before running the app, change the IP in ./backend/swe/settings.py to the IP address of the frontend, and in ./frontend/src/App.js to the IP address of the backend.
To run the app:
Clone the intended branch.
cd swe/backend
py manage.py migrate
py manage.py runserver <IP:PORT>
cd ../frontend
npm i
npm start
