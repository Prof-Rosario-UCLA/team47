import { parse, format } from "date-fns";

export default function EventSummary({ event, onClick }) {

    function subtitle() {
        const d = parse(event.day, "dd-MM-yyyy", new Date());
        const formattedDay = format(d, "MMMM d");

        const t = parse(event.time, "HH:mm", new Date());
        const formattedTime = format(t, "hh:mm");

        return `${event.host} • ${formattedDay} at ${formattedTime}`;
    }

    return (
        <article aria-label={`View details for ${event.name}`} onClick={onClick} className="bg-white p-4 rounded-lg shadow-sm cursor-pointer">
            <h3 className="font-bold text-lg">{event.name}</h3>
            <p className="text-sm text-gray-600">{subtitle()}</p>
            <p className="mt-2 text-base">📍 {event.location}</p>
        </article>
    );
}