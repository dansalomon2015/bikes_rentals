import React from "react";
import { ReservationList } from "components";

export const Reservation = () => {
    return (
        <div>
            <h3 className="text-3xl font-bold dark:text-white">Your reservations</h3>
            <ReservationList />
        </div>
    );
};
