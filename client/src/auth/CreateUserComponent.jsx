import { useState } from 'react';

export default function CreateUserComponent({ onSuccess, onBack }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        if (password !== confirm) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 5) {
            setError('Password must be at least 5 characters');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('http://localhost:1919/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    password: password
                })
            });

            if (res.ok) {
                const user = await res.json();
                onSuccess(user);
            } else {
                const { msg } = await res.json();
                setError(msg || 'Signup failed');
            }

        } catch(err) {
            console.error(err);
            setError('Network error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-sm space-y-8 p-8 bg-white rounded-xl shadow-lg">

                <button aria-label="Go back" type="button" onClick={onBack} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 text-sm focus:outline-none">← Back</button>

                <h2 id="signup-heading" className="text-center text-3xl font-semibold text-gray-900">Sign Up</h2>

                <form aria-labelledby="signup-heading" aria-describedby={error ? 'signup-error' : undefined} onSubmit={handleSubmit} className="mt-4 space-y-6">
                    <div className="space-y-4">
                        <fieldset className="block">
                            <legend className="text-sm font-medium text-gray-700">Name</legend>
                            <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tim Apple" className="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
                        </fieldset>

                        <fieldset className="block">
                            <legend className="text-sm font-medium text-gray-700">Email</legend>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
                        </fieldset>

                        <fieldset className="block">
                            <legend className="text-sm font-medium text-gray-700">Password</legend>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" className="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
                        </fieldset>

                        <fieldset className="block">
                            <legend className="text-sm font-medium text-gray-700">Confirm Password</legend>
                            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••" className="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
                        </fieldset>
                    </div>

                    <button type="submit" disabled={loading} aria-busy={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus: ring-offset-2 focus:ring-indigo-500">{loading ? "Loading..." : "Sign Up"}</button>
                    {error && (
                        <p id="signup-error" role="alert" aria-live="assertive" className="mt-2 text-center text-sm text-red-600">{error}</p>
                    )}
                </form>
            </div>
        </main>
    );
}
