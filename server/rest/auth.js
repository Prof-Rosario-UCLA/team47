import express from 'express';
import { createSession, destroySession, getUser, userExists, createUser, getUserForSession } from '../utils/db.js';
import bcrypt from 'bcryptjs';
const router = express.Router();

function setSessionCookie(res, token) {
    res.cookie('sid', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7*24*60*60*1000
    });
}

router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    if (!email) return res.status(400).send({ msg: 'Missing email' });
    if (!name) return res.status(400).send({ msg: 'Missing name' });
    if (!password) return res.status(400).send({ msg: 'Missing password' });
    if (password.length < 5) return res.status(400).send({ msg: 'Password too short' });

    try {
        if (await userExists(email)) return res.status(409).send({ msg: 'This email is already linked to an account' });
        const passwordHash = await bcrypt.hash(password, 12);
        const user = await createUser(email, name, passwordHash);
        const token = await createSession(user.uid);
        setSessionCookie(res, token);
        return res.status(200).send(user);

    } catch (error) {
        console.error("Error in /register route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).send({ msg: 'Missing email' });
    if (!password) return res.status(400).send({ msg: 'Missing password' });

    try {
        if (!(await userExists(email))) return res.status(404).send({ msg: 'User not found' });
        const user = await getUser(email);
        const correctPassword = await bcrypt.compare(password, user.passwordHash);
        if (!correctPassword) return res.status(413).send({ msg: 'Invalid credentials' });
        const token = await createSession(user.uid);
        setSessionCookie(res, token);
        return res.status(200).send({ uid: user.uid, name: user.name, email: user.email });
    
    } catch (error) {
        console.error("Error in /login route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/user', async (req, res) => {
    const token = req.cookies?.sid;
    if (!token) return res.status(401).send({ msg: 'Not Authenticated' });

    try {
        const user = await getUserForSession(token);
        if (!user) return res.status(401).send({ msg: 'Session expired' });
        return res.status(200).send(user);

    } catch (error) {
        console.error("Error in /user route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/logout', async (req,res) => {
    const token = req.cookies?.sid;
    if (token) await destroySession(token);
    res.clearCookie('sid', { httpOnly: true, secure: false, sameSite: 'lax' });
    res.sendStatus(204);
});

export default router;
