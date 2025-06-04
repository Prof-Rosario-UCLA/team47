import { mysql_db } from "./mysql-config";

export async function getEvents(date) {
    if (date.length !== 10) throw new Error(`Invalid date: ${date}`);

    try {
        const events = await mysql_db.do('SELECT event_id, name, date, decription, host FROM events WHERE date = ?', [date]);
        return events;

    } catch(e) {
        console.error(`An error occurred while fetching events on ${date}:`, e);
        throw e;
    }
}

export async function createEvent(name, date, description, host) {
    if (!name || !date || !description || !host) throw new Error('Invalid parameters for event creation');

    try {
        const eventId = await mysql_db.insert('INSERT INTO events (name, date, description, host) VALUES (?,?,?,?)', [name, date, description, host]);
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
//     date VARCHAR(10) NOT NULL,
//     description VARCHAR(500) NOT NULL,
//     host VARCHAR(20) NOT NULL
// );