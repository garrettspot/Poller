# Poller

A full-stack poll-making app with user authentication, poll creation, voting, and live results.

## Features

- User registration and login (JWT-based)
- Create polls with multiple options
- Vote on polls (one vote per user per poll)
- View poll results with live bar charts
- RESTful API (Node.js, Express, MongoDB)
- React frontend

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Install dependencies:
   ```
   cd poller-app/server
   npm install
   ```
2. Create a `.env` file in `poller-app/server`:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=8000
   ```
3. Start the backend:
   ```
   node index.js
   ```

### Frontend Setup

1. Install dependencies:
   ```
   cd poller-app/client
   npm install
   ```
2. Start the frontend:
   ```
   npm start
   ```
   The app will run on `http://localhost:3000`.

## API Endpoints

### User

- `POST /api/users/register`  
  `{ "username": "user", "password": "pass" }`

- `POST /api/users/login`  
  `{ "username": "user", "password": "pass" }`  
  Returns: `{ "token": "JWT_TOKEN" }`

### Polls

- `POST /api/polls`  
  Headers: `Authorization: Bearer <token>`  
  `{ "question": "Which JS framework?", "options": ["React", "Vue", "Angular"] }`

- `GET /api/polls`  
  Returns:  
  ```json
  [
    {
      "id": "p1",
      "question": "Which JS framework?",
      "options": [
        { "text": "React", "votes": 3 },
        { "text": "Vue", "votes": 1 }
      ]
    }
  ]
  ```

- `POST /api/polls/:id/vote`  
  Headers: `Authorization: Bearer <token>`  
  `{ "optionIndex": 0 }`

## Usage

1. Register or log in on the front page.
2. Create a poll or vote on existing polls.
3. View live results.

---

**Made with Node.js, Express, MongoDB, and React.**
