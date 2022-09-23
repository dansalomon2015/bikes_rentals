import React from "react";
import { useAuth } from "hooks";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const { auth, signOut } = useAuth();
    const navigate = useNavigate();

    const _onLogout = async () => {
        // @ts-ignore
        await signOut();
        navigate("/login");
    };

    return (
        <nav className="bg-gray-100 border-gray-200 py-1">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <div className="block ml-auto w-auto" id="navbar-default">
                    <ul className="flex ml-auto py-3 pr-4 text-sm">
                        {auth && (
                            <li>
                                <span className="block py-1  pl-3 text-gray-700 font-bold ">
                                    {auth?.username} | {auth?.user.email}
                                </span>
                            </li>
                        )}
                        <li>
                            <span
                                onClick={_onLogout}
                                className="bg-black text-white rounded-full px-2 py-1 cursor-pointer ml-3 hover:bg-red-600 "
                            >
                                Logout
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
