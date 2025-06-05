import express from 'express';
import { createEvent, getEvents, getUserForSession } from '../utils/db.js';
import { cacheEvents, fetchEventsFromCache } from '../utils/redis.js';
const router = express.Router();


router.get('/events', async (req, res) => {
    const { date } = req.query;
    if (!date || date.length !== 10) return res.status(400).send({ msg: 'Invalid date' });

    try {
        const cached = await fetchEventsFromCache(date);
        if (cached) return res.status(200).send(cached);

        const events = await getEvents(date);
        await cacheEvents(date, events);
        return res.status(200).send(events);

    } catch (error) {
        console.error("Error in /register route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/event', async (req, res) => {
    const { name, date, description, host } = req.body;
    if (!name) return res.status(400).send({ msg: 'Missing name' });
    if (!date) return res.status(400).send({ msg: 'Missing date' });
    if (!description) return res.status(400).send({ msg: 'Missing description' });
    if (!host) return res.status(400).send({ msg: 'Missing host' });

    const token = req.cookies?.sid;
    if (!token) return res.status(401).json({ msg: 'Not authenticated' });


    try {
        // Authenticate user (this should ideally be in middleware, but this is the only endpoint that enforces authentication for now – hence why it's easier to have it here for now)
        const user = await getUserForSession(token);
        if (!user) return res.status(400).send({ msg: 'Session expired' });

        await createEvent(name, date, description, host);

        // Refresh cached events
        const events = await getEvents(date);
        await cacheEvents(date, events);

        res.sendStatus(200);

    } catch (error) {
        console.error("Error in /event route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;
