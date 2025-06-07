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
        <div className="relative z-10 w-full max-w-lg bg-white rounded-lg shadow-xl p-6">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold focus:outline-none" aria-label="Close overlay">&times;</button>

            <h2 className="text-2xl font-semibold mb-4">Add New Event</h2>

            <form className="space-y-4">
                <div>
                    <label className="block text-gray-700">Event Title</label>
                    <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="e.g. Undie Run" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
                </div>

                <div>
                    <label className="block text-gray-700">Date & Time</label>
                    <input type="datetime-local" value={eventDateTime} onChange={(e) => setEventDateTime(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
                </div>

                <div>
                    <label className="block text-gray-700">Location</label>
                    <input type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} placeholder="e.g. Wilson Plaza" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
                </div>

                <div>
                    <label className="block text-gray-700">Description</label>
                    <input type="text" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="e.g. A 1 mile run to Royce quad!" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
                </div>

                <div>
                    <label className="block text-gray-700">Host</label>
                    <input type="text" value={eventHost} onChange={(e) => setEventHost(e.target.value)} placeholder="e.g. UCLA Triathlon" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
                </div>

                <button onClick={createEvent} type="submit" disabled={uploading} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {uploading ? "Uploading..." : "Create Event"}
                </button>
            </form>

        </div>
    );
}