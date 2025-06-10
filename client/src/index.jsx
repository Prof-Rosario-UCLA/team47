import React from "react";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import Spinner from "./components/spinner";
import { useState } from 'react';
import ReactDOM from "react-dom/client";
import CreateUserComponent from "./auth/CreateUserComponent";
import LoginComponent from "./auth/LoginComponent";
import MainContent from "./components/MainContent";
import CookieBanner from "./components/CookieBanner";

const IS_PROD = process.env.NODE_ENV === 'production';
export const API_BASE = IS_PROD ? '' : 'http://localhost:8080';

function App() {
    const { user, setUser, loading } = useAuth();
    const [mode, setMode] = useState('buttons'); // 'buttons', 'login', 'register'

    function onAuth(user) {
        setUser(user);
        setMode('buttons');
    }

    if (loading) {
        return <Spinner/>;
    }

    if (!user) {
        if (mode === 'login') return <LoginComponent onSuccess={onAuth} onBack={() => setMode('buttons')}/>
        if (mode === 'register') return <CreateUserComponent onSuccess={onAuth} onBack={() => setMode('buttons')}/>;
        return (
            <main role="region" aria-labelledby="auth-heading" className="min-h-screen flex items-center justify-center bg-gray-50">
                <h1 id="auth-heading" className="sr-only">Choose a way to authenticate</h1>

                <div className="flex flex-col items-stretch space-y-4 w-fit px-4">
                    <button type="button" onClick={() => setMode('login')} className="w-full flex justify-center py-2 px-8 border border-transparent rounded-lg shadow-sm text-white text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus: ring-offset-2 focus:ring-indigo-500">Log In</button>
                    <button type="button" onClick={() => setMode('register')} className="w-full flex justify-center py-2 px-8 border border-transparent rounded-lg shadow-sm text-white text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus: ring-offset-2 focus:ring-indigo-500">Sign Up</button>
                </div>
            </main>

        );
    }

    return <MainContent user={user} setUser={setUser}/>;
}

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <AuthProvider>
            <App/>
            <CookieBanner/>
        </AuthProvider>
    );