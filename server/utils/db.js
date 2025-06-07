import mysql_db from "./mysql-config.js";

export async function userExists(email) {
    if (!email) throw new Error('Missing email');

    try {
        const user = await mysql_db.getOne('SELECT email FROM users WHERE email = ?', [email]);
        if (user) return true;
        else return false;

    } catch(e) {
        console.error(`An error occurred while checking for user existence:`, e);
        throw e;
    }
}

export async function createUser(name, email, passwordHash) {
    if (!name) throw new Error('Missing name');
    if (!email) throw new Error('Missing email');
    if (!passwordHash) throw new Error('Missing password hash');

    try {
        const uid = await mysql_db.insert('INSERT INTO users (name, email, password_hash) VALUES (?,?,?)', [name, email, passwordHash]);
        const user = await mysql_db.getOne('SELECT uid, name, email FROM users WHERE uid = ?', [uid]);
        return user;

    } catch(e) {
        console.error('An error occurred while creating a user:', e);
        throw e;
    }
}

export async function getUser(email) {
    if (!email) throw new Error('Missing email');

    try {
        const user = await mysql_db.getOne('SELECT uid, name, email, password_hash AS passwordHash FROM users WHERE email = ? AND', [email]);
        return user;

    } catch(e) {
        console.error('An error occurred while fetching a user:', e);
        throw e;
    }
}

export async function getUserForSession(token) {
    if (!token) throw new Error('Missing token');

    try {
        const user = await mysql_db.getOne('SELECT u.uid, u.name, u.email FROM sessions s INNER JOIN users u ON s.uid = u.uid WHERE s.token = ?', [token]);
        return user;
        
    } catch(e) {
        console.error('An error occurred while getting a user for session:', e);
        throw e;
    }
}

export async function createSession(uid) {
    if (!uid) throw new Error('Missing uid');

    try {
        const token = crypto.randomUUID();
        await mysql_db.insert('INSERT INTO sessions (uid, token) VALUES (?,?)', [uid, token]);
        return token;

    } catch(e) {
        console.error('An error occurred while creating a session:', e);
        throw e;
    }
}

export async function destroySession(token) {
    if (!token) throw new Error('Missing token');

    try {
        await mysql_db.do('DELETE FROM sessions WHERE token = ?', [token]);
        return;

    } catch(e) {
        console.error('An error occurred while destroying session:', e);
        throw e;
    }
}

export async function getEvents(day) {
    if (!day) throw new Error('Missing day');
    if (day.length !== 10) throw new Error('Invalid day');

    try {
        const events = await mysql_db.do('SELECT event_id, name, day, time, description, host FROM events WHERE day = ?', [day]);
        return events;

    } catch(e) {
        console.error(`An error occurred while fetching events on ${date}:`, e);
        throw e;
    }
}

export async function createEvent(name, location, day, time, description, host, image_url) {
    if (!name || !location || !day || !time || !description || !host) throw new Error('Invalid parameters for event creation');
    if (day.length !== 10) throw new Error('Invalid day');
    if (time.length !== 5) throw new Error('Invalid time');

    try {
        const eventId = await mysql_db.insert('INSERT INTO events (name, location, day, time, description, host, image_url) VALUES (?,?,?,?,?,?,?)', [name, location, day, time, description, host, image_url]);
        const event = await getEventDetails(eventId);
        return event;

    } catch(e) {
        console.error(`An error occurred while creating an event:`, e);
        throw e;
    }
}

export async function getEventDetails(eventId) {
    if (!eventId) throw new Error(`Missing or invalid eventId (${eventId})`);

    try {
        const event = await mysql_db.getOne('SELECT * FROM events WHERE event_id = ?', [eventId]);
        return event;

    } catch(e) {
        console.error(`An error occurred while fetching details of event with id ${eventId}:`, e);
        throw e;
    }
}

export default { getEvents, createEvent, getEventDetails };


// CREATE TABLE events (
//     event_id INT PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(40) NOT NULL,
//     day VARCHAR(10) NOT NULL,
//     time VARCHAR(5) NOT NULL,
//     description VARCHAR(500) NOT NULL,
//     host VARCHAR(20) NOT NULL,
//     location VARCHAR(50) NOT NULL,
//     image_url VARCHAR(500) NULL
// );

// CREATE TABLE users (
//     uid INT PRIMARY KEY AUTO_INCREMENT,
//     email VARCHAR(100) NOT NULL,
//     password_hash TEXT NOT NULL,
//     name VARCHAR(100) NOT NULL
// );

// CREATE TABLE sessions (
//     token VARCHAR(500) PRIMARY KEY,
//     uid INT NOT NULL REFERENCES users(uid) ON DELETE CASCADE
// );