import { PrismaClient } from "@prisma/client";
let client = null;

function getClient() {
    if (client) return client;

    client = new  PrismaClient({
        datasources: {
            db: { url: process.env.DATABASE_URL }
        }
    });

    return client;
}

export async function userExists(email) {
    if (!email) throw new Error('Missing email');

    try {
        const user = await getClient().user.findUnique({ where: { email } });
        return Boolean(user);

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
        const user = await getClient().user.create({ data: { name, email, passwordHash } });
        return { uid: user.uid, name: user.name, email: user.email };

    } catch(e) {
        console.error('An error occurred while creating a user:', e);
        throw e;
    }
}

export async function getUser(email) {
    if (!email) throw new Error('Missing email');

    try {
        return getClient().user.findUnique({
            where: { email },
            select: { uid: true, name: true, email: true, passwordHash: true }
        });

    } catch(e) {
        console.error('An error occurred while fetching a user:', e);
        throw e;
    }
}

export async function getUserByUid(uid) {
    if (!uid) throw new Error('Missing uid');

    try {
        return getClient().user.findUnique({ where: { uid }, select: { uid: true, name: true, email: true } });
        
    } catch(e) {
        console.error('An error occurred while getting a user by uid:', e);
        throw e;
    }
}

export async function getEvents(day) {
    if (!day) throw new Error('Missing day');
    if (day.length !== 10) throw new Error('Invalid day');

    try {
        return getClient().event.findMany({ where: { day } });

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
        const event = await getClient().event.create({ data: { name, location, day, time, description, host, image_url } });
        return event;

    } catch(e) {
        console.error(`An error occurred while creating an event:`, e);
        throw e;
    }
}