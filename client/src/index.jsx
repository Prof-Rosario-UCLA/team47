import React from "react";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import Spinner from "./components/spinner";
import { useState } from 'react';
import ReactDOM from "react-dom/client";

function App() {
    const { user, loading } = useAuth();
    const [mode, setMode] = useState('buttons'); // 'buttons', 'login', 'register'

    if (loading) {
        return (<Spinner/>);
    }

    if (!user) {
        if (mode === 'login') return null // Login Component
        if (mode === 'register') return null // Sign-up Component
        return (
            <div className="center">
                <button onClick={() => setMode('register')}>Sign Up</button>
                <button onClick={() => setMode('login')}>Log In</button>
            </div>
        )
    }

    return <MainContent/>;
}

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <AuthProvider>
            <App/>
        </AuthProvider>
    );