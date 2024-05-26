Chat Application with CRUD Operations
This project is a simple chat application built using MongoDB, Express, Node.js, CSS, and JavaScript. The application allows users to send, edit, and delete messages in a chatroom.

Prerequisites
Before you begin, ensure you have the following installed:

Node.js
MongoDB

Project Setup
Step 1: Clone the Repository
bash Copy code:
git clone https://github.com/vaishanvikapadi/Chats_feature.git

cd chats_feature

Step 2: Install Dependencies
Install the required dependencies using npm:

bash:npm install


Step 3: Set Up MongoDB
Make sure your MongoDB server is running. You can start it with:

bash Copy code: mongosh
Step 4: Create Database in Mongosh
Create  add your MongoDB connection to it:

MONGO_URI=mongodb://localhost:27017/whatsapp
PORT=8080

Step 5: Start the Server
Start the Express server: node index.js


The server will start on http://localhost:8080.

Project Structure

index.js - Entry point of the application.

models/chat.js - Message model for MongoDB.
public/ - Contains static assets (HTML, CSS, JS).

API Endpoints
GET /api/messages - Retrieve all messages.
POST /api/messages - Send a new message.
PUT /api/messages/:id - Update an existing message.
DELETE /api/messages/:id - Delete a message.






