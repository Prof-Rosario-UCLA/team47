import React from "react";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import Spinner from "./components/spinner";
import { useState } from 'react';
import ReactDOM from "react-dom/client";
import CreateUserComponent from "./auth/CreateUserComponent";
import LoginComponent from "./auth/LoginComponent";

function App() {
    const { user, loading } = useAuth();
    const [mode, setMode] = useState('buttons'); // 'buttons', 'login', 'register'

    if (loading) {
        return <Spinner/>;
    }

    if (!user) {
        if (mode === 'login') return <LoginComponent/>
        if (mode === 'register') return <CreateUserComponent/>;
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