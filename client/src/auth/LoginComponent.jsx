import { useState } from 'react';

export default function LoginComponent({ onSuccess, onBack }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        const res = await fetch('http://localhost:1919/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email: email.trim(), password })
        });

        if (res.ok) {
            onSuccess(await res.json());
        } else {
            setError('Invalid credentials');
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-sm space-y-8 p-8 bg-white rounded-xl shadow-lg">

                <button aria-label="Go back" type="button" onClick={onBack} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 text-sm focus:outline-none">← Back</button>

                <h2 id="signin-heading" className="text-center text-3xl font-semibold text-gray-900">Sign In</h2>

                <form aria-labelledby="signin-heading" aria-describedby={error ? 'signin-error' : undefined} onSubmit={handleSubmit} className="mt-4 space-y-6">
                    <div className="space-y-4">
                        <fieldset className="block">
                            <legend className="text-sm font-medium text-gray-700">Email</legend>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
                        </fieldset>

                        <fieldset className="block">
                            <legend className="text-sm font-medium text-gray-700">Password</legend>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" className="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
                        </fieldset>
                    </div>

                    <button type="submit" aria-busy={false} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus: ring-offset-2 focus:ring-indigo-500">Log In</button>
                    {error && (
                        <p id="signin-error" role="alert" aria-live="assertive" className="mt-2 text-center text-sm text-red-600">{error}</p>
                    )}
                </form>
            </div>
        </main>
    );
}