
export default function MainContent({ user, setUser }) {
    async function signOut() {
        try {
            const res = await fetch('http://localhost:1919/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
    
            if (!res.ok) console.error('Error:', res);

        } catch(e) {
            console.error('Something went wrong while signing out:', e);
        } finally {
            setUser(null);
        }
    }

    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden bg-white">
            <header className="bg-blue-600 flex items-center justify-between px-6 py-4">
                <h1 className="text-white text-2xl font-bold">BruinEvents</h1>
                
                <div className="space-x-2">
                    <button className="px-4 py-2 rounded-lg bg-white text-blue-600 font-medium shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500">
                        Add Event
                    </button>

                    <button onClick={signOut} className="px-4 py-2 rounded-lg bg-white text-blue-600 font-medium shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500">
                        Sign Out
                    </button>
                </div>
            </header>

            <div className="flex flex-col items-center bg-white py-6">
                <div className="flex items-center space-x-4">
                    <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">&#8249;</button>
                    <span className="text-lg font-semibold text-gray-800">Today, June 6</span>
                    <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">&#8250;</button>
                </div>

                <input type="text" placeholder="Search" className="mt-4 w-72 md:w-96 px-4 py-2 rounded-full border border-gray-300 bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"/>
            </div>

            <div className="flex-1 m-6 border border-gray-300 bg-gray-200 flex items-center justify-center">
                <div className="text-gray-600 font-semibold">Content</div>
            </div>
        </div>
    );
}
