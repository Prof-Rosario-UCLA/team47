import { useEffect, useState } from "react";
import EventComposer from "./EventComposer";
import { format } from "date-fns";
import EventSummary from "./EventSummary";

export default function MainContent({ user, setUser }) {
    const [addingEvent, setAddingEvent] = useState(false);
    const [events, setEvents] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEvents, setFilteredEvents] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
 
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

    async function updateSelectedDate(change) {
        const newDate = new Date(selectedDate.getTime() + change * 24 * 60 * 60 * 1000);
        setSelectedDate(newDate);
        await getEvents(newDate);
    }

    async function getEvents(date) {
        setLoading(true);
        setError(null);
        setSearchTerm("");

        try {
            const res = await fetch(`http://localhost:1919/api/events?day=${format(date, "dd-MM-yyyy")}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if (res.ok) {
                setEvents(await res.json());
            } else {
                console.log(await res.json());
                setError((await res.json()).msg);
            }

        } catch(e) {
            console.log(e);
            setError("Network error");
        } finally {
            setLoading(false);
        }
    }

    function updateSearch() {

    }

    function formatDateDisplay(d) {
        return d.toLocaleString("en-US", { month: "long", day: "numeric" });
    }

    async function onEventCreationSuccess() {
        setAddingEvent(false);
        setSearchTerm('');
        await getEvents(selectedDate);
    }

    useEffect(() => { getEvents(selectedDate) }, []);

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
                    <button onClick={() => updateSelectedDate(-1)} className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">&#8249;</button>
                    <span className="text-lg font-semibold text-gray-800">{formatDateDisplay(selectedDate)}</span>
                    <button onClick={() => updateSelectedDate(+1)} className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">&#8250;</button>
                </div>

                <input type="text" placeholder="Search" className="mt-4 w-72 md:w-96 px-4 py-2 rounded-full border border-gray-300 bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"/>
            </div>

            <div className="flex-1 bg-gray-200 border border-gray-300 px-6 pt-6 pb-0 overflow-y-auto">
                {
                    error 
                    ? <div className="text-red-600">{error}</div>
                    : loading 
                        ? <div className="text-gray-600 font-semibold">Loading</div>
                        : (
                            <div className="grid grid-cols-4 gap-4">
                                { events?.map(evt => <EventSummary event={evt}/> )}
                            </div>
                        )
                }
            </div>

            {
                addingEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
                        <div onClick={() => setAddingEvent(false)} className="absolute inset-0 backdrop-blur-sm"/>
                        <EventComposer onClose={() => setAddingEvent(false)} onSuccess={onEventCreationSuccess}/>
                    </div>
                )
            }
        </div>
    );
}
