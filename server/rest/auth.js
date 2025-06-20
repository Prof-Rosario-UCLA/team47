import express from 'express';
import { getUser, userExists, createUser, getUserByUid } from '../utils/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = express.Router();

export function signToken(payload) { return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }); }
export function verifyToken(token) { return jwt.verify(token, process.env.JWT_SECRET); }

function setTokenCookie(res, token) {
    res.cookie('jwt_token', token, {
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

    console.log(email)

    try {
        if (await userExists(email)) return res.status(409).send({ msg: 'This email is already linked to an account' });
        const passwordHash = await bcrypt.hash(password, 12);
        const user = await createUser(name, email, passwordHash);
        
        const token = signToken({ uid: user.uid });
        setTokenCookie(res, token);

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

        const token = signToken({ uid: user.uid });
        setTokenCookie(res, token);

        return res.status(200).send({ uid: user.uid, name: user.name, email: user.email });
    
    } catch (error) {
        console.error("Error in /login route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/user', async (req, res) => {
    const token = req.cookies?.jwt_token;
    if (!token) return res.status(401).send({ msg: 'Not Authenticated' });

    try {
        let payload;

        try {
            payload = verifyToken(token);
        } catch {
            return res.status(401).send({ msg: 'Invalid or expired token' });
        }

        if (!payload.uid) return res.status(401).send({ msg: 'Invalid or expired token' });

        const user = await getUserByUid(payload.uid);
        if (!user) return res.status(404).send({ msg: 'User not found' });

        return res.status(200).send(user);

    } catch (error) {
        console.error("Error in /user route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/logout', async (req,res) => {
    res.clearCookie('jwt_token', { httpOnly: true, secure: false, sameSite: 'lax' });
    res.sendStatus(204);
});

export default router;