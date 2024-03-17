# Chat Application Created for College students for having Conversations

This website allows students to connect with each other by registering them with their college domian mail id and can have their conversations.

## Technologies Used

- MERN stack (MongoDB, Express.js, React.js, and Node.js)
- Socket.io
- Redux Toolkit
- Tailwind CSS

## Features

- sending and receiving messages in real-time
- sign up, log in, and log out using their mail id's
- user authentication while registering their email
- create chat rooms and invite others to join
- eceive notifications on new messages
- emojis in messages
- Profile page where users can update their display name and bio
- Search functionality

## Configuration and Setup

To setup this project locally simply just clone this repository or download the zip file.

- open the project in your code editor
- open terminal and split it into two
- In first Terminal set the path to the client directory
- cd client and create a .env file and add following details

```

REACT_APP_SERVER_URL='http://localhost:8000'
REACT_APP_CLIENT_URL="http://localhost:3000"

```
- after completing navigate to client terminal and run following commands
```
$ cd client
$ npm install --legacy-peer-deps(to install client-side dependencies)
$ npm start (to start the client)

```
- In second Terminal set the path tothe server directory
- cd server and create a .env file and add following details

```

PORT=8000
URL="" #database url
BASE_URL="http://localhost:3000"
SERVER_URL="http://localhost"

HOST="smtp.gmail.com"
SERVICE="gmail"
EMAIL_PORT=587
SECURE=false
USER="" #provide a mail that is used for authentication
PASS="" #for that mail you will get app password paste it here

```

- navigate to server terminal and run the following commands
```
$ cd server
$ npm install --legacy-peer-deps(to install server-side dependencies)
& npm start (to start the server)

```
## Note

This website accepts the mail id's with particular college domain id, if you want to use other mail id's change the condition in code and it will accept all mail types of mail id's.