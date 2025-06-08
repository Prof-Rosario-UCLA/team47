import React from 'react';

export default function Spinner({ label = 'Loading...' }) {
    return (
        <div role="status" aria-live="polite" aria-label="Attempting to authenticte, please wait." className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/30 border-t-white"/>
            <p className="mt-4 text-lg font-medium text-white drop-shadow-sm">{label}</p>
        </div>
    );
}