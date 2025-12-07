const express = require('express');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const { getDB } = require('../db');

const router = express.Router();

// multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// GET (by ID)
router.get('/events', async (req, res) => {
    try {
        const db = getDB();
        const collection = db.collection('events');

        // if ID, get single event
        if (req.query.id) {
            const event = await collection.findOne({
                _id: new ObjectId(req.query.id)
            });
            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }
            return res.json(event);
        }

        // get with limit 5
        const type = req.query.type || 'latest';
        const limit = parseInt(req.query.limit) || 5;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;

        const events = await collection
            .find({})
            .sort({ schedule: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST - create a new event
router.post('/events', upload.single('image'), async (req, res) => {
    try {
        const db = getDB();
        const collection = db.collection('events');

        const event = {
            type: 'event',
            uid: parseInt(req.body.uid),
            name: req.body.name,
            tagline: req.body.tagline,
            schedule: new DataTransfer(req.body.schedule),
            description: req.body.description,
            files: req.file ? { image: req.file.path } : null,
            moderator: req.body.moderator,
            category: req.body.category,
            sub_category: req.body.sub_category,
            rigor_rank: parseInt(req.body.rigor_rank),
            attendees: []
        };

        const result = await collection.insertOne(event);
        res.status(201).json({ id: result.insertId });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT - update an event
router.put('/events/:id', upload.single('image'), async (req, res) => {
    try {
        const db = getDB();
        const collection = db.collection('events');

        const updateData = {
            ...(req.body.name && { name: req.body.name }),
            ...(req.body.tagline && { tagline: req.body.tagline }),
            ...(req.body.schedule && { schedule: new Date(req.body.schedule)
        }),
            ...(req.body.description && { description: req.body.description
        }),
            ...(req.body.moderator && {moderator: req.body.moderator }),
            ...(req.body.category && { category: req.body.category }),
            ...(req.body.sub_category && { sub_category: req.body.sub_category }),
            ...(req.body.rigor_rank && { rigor_rank: parseInt(req.body.rigor_rank) }),
            ...(req.file && { files: { image: req.file.path } })
        };

        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - delete an event
router.delete('/events/:id', async (req, res) =>{
    try {
        const db = getDB();
        const collection = db.collection('events');

        const result = await collection.deleteOne({
            _id: new ObjectId(req.params.id)
        });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST - add attendee to event
router.post('/events/:id/attendees', async (req, res) => {
    try {
        const db = getDB();
        const collection = db.collection('events');

        const userId = parseInt(req.body.userId);

        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $addToSet: { attendees: userId } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Event not found' }); 
        }
        res.json({ message: 'Attendee added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;