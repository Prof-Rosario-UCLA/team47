import express from 'express';
import { createEvent, getEvents } from '../utils/db.js';
import { cacheEvents, fetchEventsFromCache, invalidateEventsCache } from '../utils/redis.js';
import { summarizeEvents } from '../utils/open-ai-api.js';
const router = express.Router();


router.get('/events', async (req, res) => {
    const { day } = req.query;
    if (!day || day.length !== 10) return res.status(400).send({ msg: 'Invalid date' });

    try {
        const cached = await fetchEventsFromCache(day);
        if (cached) return res.status(200).send(cached);

        const events = await getEvents(day);
        const summary = await summarizeEvents(events);
        const data = { events, summary };

        await cacheEvents(day, data);

        return res.status(200).send(data);

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
        await createEvent(name, location, day, time, description, host, image_url);
        await invalidateEventsCache(day);

        res.sendStatus(200);

    } catch (error) {
        console.error("Error in /event route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;