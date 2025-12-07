const express = require('express');
const {connectDB} = require('./db');
const eventsRouter = require('./routes/events');
// load env variables
require('dotenv').config();

const app = express();
// get port from .env
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v3/app', eventsRouter);

// start server after DB connection
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});