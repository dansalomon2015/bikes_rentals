import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, ManagerHome, Register, UserHome } from "pages/";
import { RequireAuth } from "components/";
import { ROLES } from "utils/";
import { AuthProvider } from "context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<App />}>
                        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                            <Route path="/home/user" element={<UserHome />} />
                        </Route>
                        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                            <Route path="/home/admin" element={<ManagerHome />} />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
