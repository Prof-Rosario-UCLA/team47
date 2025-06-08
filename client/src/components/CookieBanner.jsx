import { useState, useEffect } from "react";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("cookieConsent") !== "true") setVisible(true);
    }, []);

    function handleAccept() {
        localStorage.setItem("cookieConsent", "true");
        setVisible(false);
    }

    if (!visible) return false;

    return (
        <aside role="region" aria-label="Cookie consent banner" aria-live="polite" className="fixed bottom-0 inset-x-0 z-50 bg-gray-900 text-gray-100">
            <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-4">
                <p className="text-sm flex-1">
                    We use <strong>essential cookies only</strong> to keep you signed-in and secure. These cookies are required for BruinEvents to work.
                </p>

                <button onClick={handleAccept} aria-label="Accept cookies" className="px-4 py-2 rouneded-lg bg-indigo-600 hover:bg-indigo-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Got it
                </button>
            </div>
        </aside>
    )
}