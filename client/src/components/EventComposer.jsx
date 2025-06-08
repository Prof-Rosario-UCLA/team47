import { useState } from "react";
import { format } from "date-fns";

export default function EventComposer({ onClose, onSuccess }) {
    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDateTime, setEventDateTime] = useState(new Date());
    const [eventHost, setEventHost] = useState('');
    const [eventImageUrl, setEventImageUrl] = useState(null);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);

    async function createEvent() {
        setUploading(true);
        setError(null);
        
        try {
            const res = await fetch('http://localhost:1919/api/event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: eventName,
                    location: eventLocation,
                    day: format(eventDateTime, "dd-MM-yyyy"),
                    time: format(eventDateTime, "HH:mm"),
                    description: eventDescription,
                    image_url: eventImageUrl,
                    host: eventHost
                }),
                credentials: 'include'
            });

            if (res.ok) {
                onSuccess();

            } else {
                const resJson = await res.json();
                console.log(resJson);
                setError(resJson.msg ?? resJson.error ?? JSON.stringify(resJson));
            }

            onSuccess();

        } catch(e) {
            setError('Network error');
        } finally {
            setUploading(false);
        }
    }

    return (
        <div role="dialog" aria-modal="true" aria-labelledby="composer-title" className="relative z-10 w-full max-w-lg bg-white rounded-lg shadow-xl p-6">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold focus:outline-none" aria-label="Close overlay">&times;</button>

            <h2 id="composed-title" className="text-2xl font-semibold mb-4">Add New Event</h2>

            <form onSubmit={createEvent} aria-busy={uploading} className="space-y-4">
                <div>
                    <label htmlFor="event-name" className="block text-gray-700">Event Name</label>
                    <input id="event-name" type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="e.g. Undie Run" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
                </div>

                <div>
                    <label htmlFor="event-date-time" className="block text-gray-700">Date & Time</label>
                    <input id="event-date-time" type="datetime-local" value={eventDateTime} onChange={(e) => setEventDateTime(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
                </div>

                <div>
                    <label htmlFor="event-location" className="block text-gray-700">Location</label>
                    <input id="event-location" type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} placeholder="e.g. Wilson Plaza" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
                </div>

                <div>
                    <label htmlFor="event-description" className="block text-gray-700">Description</label>
                    <input id="event-description" type="text" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="e.g. A 1 mile run to Royce quad!" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
                </div>

                <div>
                    <label htmlFor="event-host" className="block text-gray-700">Host</label>
                    <inpu id="event-host" type="text" value={eventHost} onChange={(e) => setEventHost(e.target.value)} placeholder="e.g. UCLA Triathlon" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
                </div>

                <button type="submit" disabled={uploading} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {uploading ? "Uploading..." : "Create Event"}
                </button>

                {error && (
                    <p role="alert" className="mt-2 text-center text-sm text-red-600">{error}</p>
                )}
            </form>

        </div>
    );
}