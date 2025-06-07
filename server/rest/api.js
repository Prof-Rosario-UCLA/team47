import express from 'express';
import { createEvent, getEvents, getUserForSession } from '../utils/db.js';
import { cacheEvents, fetchEventsFromCache } from '../utils/redis.js';
const router = express.Router();


router.get('/events', async (req, res) => {
    const { day } = req.query;
    if (!day || day.length !== 10) return res.status(400).send({ msg: 'Invalid date' });

    try {
        const cached = await fetchEventsFromCache(day);
        if (cached) return res.status(200).send(cached);

        const events = await getEvents(day);
        await cacheEvents(day, events);
        return res.status(200).send(events);

    } catch (error) {
        console.error("Error in /events route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/event', async (req, res) => {
    const { name, location, day, time, description, host, image_url } = req.body;
    if (!name) return res.status(400).send({ msg: 'Missing name' });
    if (!location) return res.status(400).send({ msg: 'Missing location' });
    if (!day) return res.status(400).send({ msg: 'Missing date' });
    if (!time) return res.status(400).send({ msg: 'Missing time' });
    if (!description) return res.status(400).send({ msg: 'Missing description' });
    if (!host) return res.status(400).send({ msg: 'Missing host' });
    if (day.length !== 10) return res.status(400).send({ msg: 'Invalid day' });
    if (time.length !== 5) return res.status(400).send({ msg: 'Invalid time' });

    const token = req.cookies?.sid;
    if (!token) return res.status(401).json({ msg: 'Not authenticated' });


    try {
        // Authenticate user (this should ideally be in middleware, but this is the only endpoint that enforces authentication for now – hence why it's easier to have it here for now)
        const user = await getUserForSession(token);
        if (!user) return res.status(400).send({ msg: 'Session expired' });

        await createEvent(name, location, day, time, description, host, image_url);

        // Update cached events
        const events = await getEvents(day);
        await cacheEvents(day, events);

        res.sendStatus(200);

    } catch (error) {
        console.error("Error in /event route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;