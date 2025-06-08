import { format, parse } from "date-fns";

export default function EventDetails({ event, onClose }) {

    function formattedDateTime() {
        const d = parse(event.day, "dd-MM-yyyy", new Date());
        const formattedDay = format(d, "MMMM d");

        const t = parse(event.time, "HH:mm", new Date());
        const formattedTime = format(t, "hh:mm");

        return `${formattedDay} at ${formattedTime}`;
    }

    return (
        <dialog aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-content" className="relative z-10 w-full max-w-lg bg-white rounded-lg shadow-xl p-6">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold focus:outline-none" aria-label="Close overlay">&times;</button>

            <h2 id="modal-title" className="text-2xl font-semibold mb-4">Event Details</h2>

            <dl id="modal-content" className="space-y-4">
                <div>
                    <dt className="block text-gray-700">Event Title</dt>
                    <dd className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">{event.name}</dd>
                </div>

                <div>
                    <dt className="block text-gray-700">Date & Time</dt>
                    <dd className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">{formattedDateTime()}</dd>
                </div>

                <div>
                    <dt className="block text-gray-700">Location</dt>
                    <dd className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">{event.location}</dd>
                </div>

                <div>
                    <dt className="block text-gray-700">Description</dt>
                    <dd className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">{event.description}</dd>
                </div>

                <div>
                    <dt className="block text-gray-700">Host</dt>
                    <dd className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">{event.host}</dd>
                </div>

                {event.image_url && (
                    <img src={event.image_url} alt="Preview" className="mt-2 mx-auto max-h-40 rounded"/>
                )}
            </dl>
        </dialog>
    );
}