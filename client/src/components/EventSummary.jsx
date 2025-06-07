export default function EventSummary({ event }) {

    function formattedDateTime() {
        return `${event.day} ${event.time}`;
    }

    return (
        <div key={event.event_id} className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg">{event.name}</h3>
            <p className="text-sm text-gray-600">{formattedDateTime()}</p>
            <p className="mt-2 text-base">{event.location}</p>
        </div>
    );
}