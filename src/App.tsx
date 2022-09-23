import React from "react";
import { AuthProvider } from "context";

import { Outlet } from "react-router-dom";
import SideBar from "components/SideBar";
import { Navbar } from "components";

function App() {
    return (
        <AuthProvider>
            <div className="flex">
                <SideBar />
                <div className="h-screen w-full">
                    <Navbar />
                    <div className="p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </AuthProvider>
    );
}

export default App;
