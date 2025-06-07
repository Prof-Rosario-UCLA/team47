import { useEffect, useState } from "react";

export default function MainContent({ user, setUser }) {
    const [addingEvent, setAddingEvent] = useState(false);
    const [events, setEvents] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [error, setError] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEvents, setFilteredEvents] = useState(null);
    const [newEventData, setNewEventData] = useState({ name: '', dateTime: Date.now(), location: '' });
 
    async function signOut() {
        try {
            const res = await fetch('http://localhost:1919/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
    
            if (!res.ok) console.error('Error:', res);

        } catch(e) {
            console.error('Something went wrong while signing out:', e);
        } finally {
            setUser(null);
        }
    }

    async function getEvents() {
        setLoading(true);
        setError(null);
        setSearchTerm("");

        try {
            const res = await fetch('http://localhost:1919/api/events', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if (res.ok) {
                setEvents(await res.json());
            } else {
                setError((await res.json()).msg);
            }

        } catch(e) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    }

    async function addEvent() {
        setUploading(true);
        setUploadError(null);

        try {
            const res = await fetch('http://localhost:1919/api/event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: {

                },
                credentials: 'include'
            });

            if (res.ok) {
                setAddingEvent(false);
                await getEvents();

            } else {
                setAddingEvent(false);
                setUploadError((await res.json()).msg);
            }

        } catch(e) {
            setError("Network error");
        } finally {
            setUploading(false);
        }
    }

    function updateSearch() {

    }

    useEffect(() => { getEvents() }, []);

    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden bg-white">
            <header className="bg-blue-600 flex items-center justify-between px-6 py-4">
                <h1 className="text-white text-2xl font-bold">BruinEvents</h1>
                
                <div className="space-x-2">
                    <button onClick={() => setAddingEvent(true)} className="px-4 py-2 rounded-lg bg-white text-blue-600 font-medium shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500">
                        Add Event
                    </button>

                    <button onClick={signOut} className="px-4 py-2 rounded-lg bg-white text-blue-600 font-medium shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500">
                        Sign Out
                    </button>
                </div>
            </header>

            <div className="flex flex-col items-center bg-white py-6">
                <div className="flex items-center space-x-4">
                    <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">&#8249;</button>
                    <span className="text-lg font-semibold text-gray-800">Today, June 6</span>
                    <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">&#8250;</button>
                </div>

                <input type="text" placeholder="Search" className="mt-4 w-72 md:w-96 px-4 py-2 rounded-full border border-gray-300 bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"/>
            </div>

            <div className="flex-1 m-6 border border-gray-300 bg-gray-200 flex items-center justify-center">
                <div className="text-gray-600 font-semibold">Content</div>
            </div>

            {
                addingEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
                        <div onClick={() => setAddingEvent(false)} className="absolute inset-0 backdrop-blur-sm"/>

                        <div className="relative z-10 w-full max-w-lg bg-white rounded-lg shadow-xl p-6">
                            <button onClick={() => setAddingEvent(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold focus:outline-none" aria-label="Close overlay">&times;</button>

                            <h2 className="text-2xl font-semibold mb-4">Add New Event</h2>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-gray-700">Event Title</label>
                                    <input type="text" value={newEventData.name} onChange={(e) => { newEventData.name = e.target.value }} placeholder="e.g. Undie Run" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
                                </div>

                                <div>
                                    <label className="block text-gray-700">Date & Time</label>
                                    <input type="datetime-local" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
                                </div>

                                <div>
                                    <label className="block text-gray-700">Location</label>
                                    <input type="text" placeholder="e.g. Wilson Plaza" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
                                </div>

                                <button onClick={() => addEvent()} type="submit" disabled={uploading} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    {uploading ? "Uploading..." : "Create Event"}
                                </button>
                            </form>

                        </div>
                    </div>
                )
            }
        </div>
    );
}
