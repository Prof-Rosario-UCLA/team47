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
        if (mode === 'login') return <LoginComponent onSuccess={(user) => {}}/>
        if (mode === 'register') return <CreateUserComponent onSuccess={(user) => {}}/>;
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <button onClick={() => setMode('login')} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus: ring-offset-2 focus:ring-indigo-500">Log In</button>
                <button onClick={() => setMode('register')} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus: ring-offset-2 focus:ring-indigo-500">Sign Up</button>
             </div>
        );
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