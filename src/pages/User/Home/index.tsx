import React from "react";
import { BikesList } from "components/";

export const UserHome = () => {
    return (
        <div>
            <h3 className="text-3xl font-bold dark:text-white mb-3">List of bikes</h3>
            <BikesList />
        </div>
    );
};
