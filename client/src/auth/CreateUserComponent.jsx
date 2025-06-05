import { useState } from 'react';

export default function CreateUserComponent({ onSuccess }) {
    const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setValues(v => ({ ...v, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        if (values.password !== values.confirm) {
            setError('Passwords do not match');
            return;
        }

        if (values.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name: values.name.trim(),
                    email: values.email.trim(),
                    password: values.password
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
            setError('Network error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={values.name} onChange={handleChange} required/>
            <input name="email" placeholder="Email" value={values.email} onChange={handleChange} required/>
            <input name="password" placeholder="Password" values={values.password} onChange={handleChange} required/>
            <input name="confirm" placeholder="Confirm Password" values={values.confirm} onChange={handleChange} required/>
            <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign up'}</button>
            {error && <p>{error}</p>}
        </form>
    );
}