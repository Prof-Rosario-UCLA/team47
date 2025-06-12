import React from "react";
import { AuthProvider, useAuth } from "./src/auth/AuthProvider";
import Spinner from "./src/components/spinner";
import { useState } from 'react';
import ReactDOM from "react-dom/client";
import CreateUserComponent from "./src/auth/CreateUserComponent";
import LoginComponent from "./src/auth/LoginComponent";
import MainContent from "./src/components/MainContent";
import CookieBanner from "./src/components/CookieBanner";
import "./styles.css";

function App() {
    const { user, setUser, loading } = useAuth();
    const [mode, setMode] = useState('buttons'); // 'buttons', 'login', 'register'

    if (loading) {
        return <Spinner/>;
    }

    if (!user) {
        if (mode === 'login') return <LoginComponent onSuccess={(user) => setUser(user)}/>
        if (mode === 'register') return <CreateUserComponent onSuccess={(user) => setUser(user)}/>;
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <button onClick={() => setMode('login')} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus: ring-offset-2 focus:ring-indigo-500">Log In</button>
                <button onClick={() => setMode('register')} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus: ring-offset-2 focus:ring-indigo-500">Sign Up</button>
             </div>
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