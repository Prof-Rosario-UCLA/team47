import { useEffect, useState } from "react";
import EventComposer from "./EventComposer";
import { format } from "date-fns";
import EventSummary from "./EventSummary";
import EventDetails from "./EventDetails";

import init, { filter_events } from "../../rust/pkg/event_filter.js";
import { API_BASE } from "..";
init();

export default function MainContent({ user, setUser }) {
    const [addingEvent, setAddingEvent] = useState(false);
    const [eventsData, setEventsData] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
 
    async function signOut() {
        try {
            const res = await fetch(`${API_BASE}/auth/logout`, {
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
        await getEventsData(newDate);
    }

    async function getEventsData(date) {
        setLoading(true);
        setError(null);
        setSearchTerm("");

        try {
            const res = await fetch(`${API_BASE}/api/events?day=${format(date, "dd-MM-yyyy")}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if (res.ok) {
                setEventsData(await res.json());
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

    function filteredEvents() {
        if (!eventsData) return null;
        if (searchTerm.length === 0) return eventsData.events;
        return filter_events(eventsData.events, searchTerm);
    }

    function formatDateDisplay(d) {
        return d.toLocaleString("en-US", { month: "long", day: "numeric" });
    }

    async function onEventCreationSuccess() {
        setAddingEvent(false);
        await getEventsData(selectedDate);
    }

    useEffect(() => { getEventsData(selectedDate) }, []);

    return (
        <main className="h-screen w-screen flex flex-col overflow-hidden bg-white">
            <header className="bg-blue-600 flex items-center justify-between px-6 py-4">
                <h1 className="text-white text-2xl font-bold">BruinEvents</h1>
                
                <div className="space-x-2">
                    <button onClick={() => setAddingEvent(true)} className="px-4 py-2 rounded-lg bg-white text-blue-600 font-medium shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                        Add Event
                    </button>

                    <button onClick={signOut} className="px-4 py-2 rounded-lg bg-white text-blue-600 font-medium shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                        Sign Out
                    </button>
                </div>
            </header>

            <div className="flex flex-col items-center bg-white py-6">
                <nav aria-label="Change day" className="flex items-center space-x-4">
                    <button aria-label="Previous day" onClick={() => updateSelectedDate(-1)} className="bg-gray-200 hover:bg-gray-300 rounded-full w-7 h-7 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">&#8249;</button>
                    <span className="text-lg font-semibold text-gray-800">{formatDateDisplay(selectedDate)}</span>
                    <button aria-label="Next day" onClick={() => updateSelectedDate(+1)} className="bg-gray-200 hover:bg-gray-300 rounded-full w-7 h-7 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">&#8250;</button>
                </nav>

                <label htmlFor="event-search" className="sr-only">Search events</label>
                <input id="event-search" aria-describedby="search-help" aria-controls="event-list" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" className="mt-4 max-w-lg w-[calc(100%-3rem)] px-4 py-2 rounded-full border border-gray-300 bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"/>
                <p id="search-help" className="sr-only">Enter keywords to filter events.</p>
            </div>

            <div className="flex-1 bg-gray-200 border border-gray-300 px-6 pt-6 pb-0 overflow-y-auto">
                {
                    error 
                    ? <div role="alert" aria-live="assertive" className="text-red-600">{error}</div>
                    : loading 
                        ? <div role="status" aria-live="polite" aria-label="Loading events" className="text-gray-600 font-semibold">Loading...</div>
                        : (
                            <div className="flex flex-col">
                                <p id="events-summary" aria-live="polite" className="w-full text-left mb-4">{eventsData?.summary}</p>
                                <ul id="event-list" aria-label="Event list" className="grid gap-4 auto-rows-fr [grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))] lg:grid-cols-4">
                                    { (filteredEvents())?.map(evt => 
                                        <li key={evt.event_id}>
                                            <EventSummary event={evt} onClick={() => setSelectedEvent(evt)}/>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            
                        )
                }
            </div>

            {
                selectedEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true">
                        <div onClick={() => setSelectedEvent(null)} className="absolute inset-0 backdrop-blur-sm"/>
                        <EventDetails onClose={() => setSelectedEvent(null)} event={selectedEvent}/>
                    </div>
                )
            }

            {
                addingEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true">
                        <div onClick={() => setAddingEvent(false)} className="absolute inset-0 backdrop-blur-sm"/>
                        <EventComposer onClose={() => setAddingEvent(false)} onSuccess={onEventCreationSuccess}/>
                    </div>
                )
            }
        </main>
    );
}
