import { config } from 'dotenv'; config({ path: '../.env' });
import axios from 'axios';

export async function summarizeEvents(events) {
    try {
        const systemPrompt = `
        Your job is to write a small summary blob (around 200 characters) that gives a user of a website a simple overview of a list of events.
        You will be given a list of events, which you must read through and summarize succinctly.
        This is being done as part of a website called BruinEvents, which is a platform for UCLA students to see upcoming events on campus.
        If there are too many events, you do not have to include all of them. Instead, you should try to prioritize the most interesting ones.
        The response must be a single blob of text, which is JUST THE SUMMARY (NOTHING ELSE).
        EVENTS: ${JSON.stringify(events)}
        `;

        const endpoint = '';
        const response = await axios.get(endpoint);

    } catch(e) {
        console.error('An error occurred while summarizing events:', e);
        return null;
    }
}

export default { summarizeEvents };