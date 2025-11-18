# Task Manager API

A simple Task Manager REST API built using **Node.js** and **Express**, following all the guidelines.  

The API supports creating, reading, updating, and deleting tasks, with all data stored in a JSON file.

All test cases included in the project pass successfully using `npm test`.

---

## 🚀 Features

- Create a new task  
- Get all tasks  
- Get a task by ID  
- Update a task  
- Delete a task  
- Data persists in a local JSON file  
- Project fully tested (all tests passing)

---

## Project Structure

├── app.js
├── task.json
├── routes/
│ └── tasks.js
└── test/
└── server.test.js

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**

## Install & Setup

## Clone your GitHub Classroom repo

git clone <link>

cd <dir name>

## Install dependencies

npm install

npm run dev <or> npm node app.js

Serrver runs at:
http://localhost:3000

## run test

npm test

Check :

19 Passing
0 failing

## API

Get task
GET /tasks

Get specific task
GET /tasks/:id

Create new task
POST /tasks

Update a task
PUT /tasks/:id

Update specific field in a task
PATCH /tasks/:id

Delete a task
DELETE /tasks/:id