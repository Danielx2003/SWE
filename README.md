# SWE
Group SWE Repo.
<br />
<br />
Due to issues with submission, our submitted branch is docs.
<br />
To access it, run git clone -b docs LINK
<br />
To access our fully working version, run: 
<br />
git clone -b mainv3 LINK.
<br />

Before running the app, change the IP in ./backend/swe/settings.py to the IP address of the frontend, and in ./frontend/src/App.js to the IP address of the backend. If hosted locally, set the IP to be localhost. If running locally, you can run py manage.py runserver, WITHOUT the <IP:PORT>. Furthermore, if you decide to host the app for the LAN, you cannot access the site with the computer that is running the server, you must connect with different devices only.
<br />
<br />
To run the app:
<br />
Clone the intended branch.
<br />
cd swe/backend
<br />
py manage.py migrate
<br />
py manage.py runserver <IP:PORT>
<br />
cd ../frontend
<br />
npm i
<br />
npm start
<br />
