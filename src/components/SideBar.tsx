import React, { useCallback } from "react";
import { MenuItem } from "./MenuItem";
import { Badge } from "./Badge";
import { useLocation } from "react-router-dom";
import { useAuth, useStore } from "hooks/";
import { isAdmin } from "utils/";

export default function SideBar() {
    const { auth } = useAuth();
    const { bikes } = useStore();
    const location = useLocation();

    const isActive = useCallback(
        (path: string) => {
            return location.pathname === path;
        },
        [location]
    );

    let homePath = isAdmin(auth) ? "/home/admin" : "/home/user";

    return (
        <aside className="w-64 h-screen" aria-label="Sidebar">
            <div className="overflow-y-auto h-full py-4 px-3 bg-yellow-400">
                <span className="flex items-center pl-2.5 mb-5 self-center text-xl font-semibold whitespace-nowrap ">
                    Biker Rentals
                </span>

                <ul className="space-y-2">
                    <li>
                        <MenuItem
                            to={homePath}
                            title="Bikes List"
                            active={isActive(homePath)}
                            content={<Badge count={bikes.length} />}
                        />
                    </li>
                    <li>
                        <MenuItem
                            to="/resa"
                            title="Reservations"
                            active={isActive("/resa")}
                            content={<Badge count={3} />}
                        />
                    </li>
                    {isAdmin(auth) && (
                        <li>
                            <MenuItem
                                to="/resa"
                                title="Users"
                                active={isActive("/users")}
                                content={<Badge count={3} />}
                            />
                        </li>
                    )}
                    {isAdmin(auth) && (
                        <li>
                            <MenuItem
                                to="/resa"
                                title="Managers"
                                active={isActive("/managers")}
                                content={<Badge count={3} />}
                            />
                        </li>
                    )}
                </ul>
            </div>
        </aside>
    );
}
