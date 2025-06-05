import { useState } from 'react';

export default function LoginComponent({ onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });

        if (res.ok) {
            onSuccess(await res.json());
        } else {
            setError('Invalid credentials');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email"/>
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password"/>
            <button type="submit">Log in</button>
            { error && <p>{error}</p> }
        </form>
    );
}