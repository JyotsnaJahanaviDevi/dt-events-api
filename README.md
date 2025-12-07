text
# DT Events API

A RESTful API for managing events, built with Node.js, Express, and MongoDB as part of the DeepThought internship selection process.

## 🚀 Features

- **CRUD Operations**: Create, Read, Update, and Delete events
- **MongoDB Integration**: Uses native MongoDB driver (schema-less design)
- **Image Upload**: Support for event cover images using Multer
- **Pagination**: Get events with customizable pagination
- **RESTful Design**: Follows REST API best practices
- **Environment Variables**: Secure configuration using dotenv

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **File Upload**: Multer
- **Environment Management**: dotenv

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## ⚙️ Installation

1. **Clone the repository**
git clone https://github.com/YOUR_USERNAME/dt-events-api.git
cd dt-events-api

text

2. **Install dependencies**
npm install

text

3. **Create `.env` file** in the root directory
MONGODB_URI=your_mongodb_connection_string
PORT=3000

text

4. **Create uploads folder**
mkdir uploads

text

5. **Start the server**
node index.js

text

You should see:
Connected to MongoDB
Server running on http://localhost:3000

text

## 📡 API Endpoints

### Base URL
http://localhost:3000/api/v3/app

text

### 1. Create Event
**POST** `/events`

**Body** (form-data):
| Field | Type | Value |
|-------|------|-------|
| uid | Number | 18 |
| name | String | Tech Meetup 2025 |
| tagline | String | Learn and Network |
| schedule | String | 2025-12-20T10:00:00 |
| description | String | A tech event for developers |
| moderator | String | John Doe |
| category | String | Technology |
| sub_category | String | Web Development |
| rigor_rank | Number | 5 |
| image | File | (optional) |

**Response**:
{
"id": "675abc123def456"
}

text

---

### 2. Get Latest Events
**GET** `/events?type=latest&limit=5&page=1`

**Query Parameters**:
- `type`: Filter type (default: "latest")
- `limit`: Number of results per page (default: 5)
- `page`: Page number (default: 1)

**Response**:
[
{
"_id": "675abc123...",
"type": "event",
"uid": 18,
"name": "Tech Meetup 2025",
"tagline": "Learn and Network",
"schedule": "2025-12-20T10:00:00.000Z",
"description": "A tech event for developers",
"files": {
"image": "uploads/1733516234-event.jpg"
},
"moderator": "John Doe",
"category": "Technology",
"sub_category": "Web Development",
"rigor_rank": 5,
"attendees": []
}
]

text

---

### 3. Get Event by ID
**GET** `/events?id={event_id}`

**Query Parameters**:
- `id`: Event ID (required)

**Response**:
{
"_id": "675abc123...",
"type": "event",
"uid": 18,
"name": "Tech Meetup 2025",
"tagline": "Learn and Network",
"schedule": "2025-12-20T10:00:00.000Z",
"description": "A tech event for developers",
"files": {
"image": "uploads/1733516234-event.jpg"
},
"moderator": "John Doe",
"category": "Technology",
"sub_category": "Web Development",
"rigor_rank": 5,
"attendees": []
}

text

---

### 4. Update Event
**PUT** `/events/{event_id}`

**Body** (form-data):
| Field | Type | Value |
|-------|------|-------|
| name | String | Updated Tech Meetup |
| rigor_rank | Number | 10 |

**Response**:
{
"message": "Event updated successfully"
}

text

---

### 5. Delete Event
**DELETE** `/events/{event_id}`

**Response**:
{
"message": "Event deleted successfully"
}

text

## 📂 Project Structure

dt-events-api/
├── routes/
│ └── events.js # Event routes and controllers
├── uploads/ # Uploaded images storage
├── .env # Environment variables (not in repo)
├── .gitignore # Git ignore file
├── db.js # MongoDB connection setup
├── index.js # Main server file
├── package.json # Project dependencies
└── README.md # Project documentation

text

## 🗄️ Data Model

### Event Object
{
type: "event",
uid: Number, // User ID who created the event
name: String, // Event name
tagline: String, // Event tagline
schedule: Timestamp, // Event date and time
description: String, // Event description
files: {
image: String // Path to uploaded image
},
moderator: String, // Event moderator/host
category: String, // Event category
sub_category: String, // Event sub-category
rigor_rank: Number, // Event difficulty/rigor level
attendees: [Number] // Array of user IDs attending
}

text

## 🔒 Environment Variables

Create a `.env` file with the following:

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
PORT=3000

text

## 🧪 Testing

Use **Postman** to test all endpoints:

1. Import the API endpoints
2. Set base URL to `http://localhost:3000/api/v3/app`
3. Test each CRUD operation
4. For file uploads, use form-data with file type

## 📝 Key Implementation Details

- **No Mongoose**: Uses native MongoDB driver as per requirements
- **Schema-less**: MongoDB collections have no fixed schema
- **File Uploads**: Multer handles multipart/form-data
- **ObjectId**: MongoDB `_id` is used as unique identifier
- **Error Handling**: Proper error responses for all endpoints

## 👨‍💻 Author

Created as part of DeepThought (DT) Internship Selection Process - Task 1

## 📄 License

This project is created for educational purposes as part of an internship assessment.