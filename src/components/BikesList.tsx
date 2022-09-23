import React from "react";
import { BikeCard } from "./BikeCard";
import { useStore } from "hooks/";

export const BikesList = () => {
    const { bikes, loadingBikes } = useStore({});
    return (
        <div className="grid overflow-hidden grid-cols-4 grid-rows-3 gap-3.5">
            {loadingBikes ? (
                <span className="text-xs">Loading bikes list...</span>
            ) : !bikes.length ? (
                <span className="text-xs">No data found</span>
            ) : (
                bikes.map((bike) => (bike.available ? <BikeCard bike={bike} key={bike.id} /> : null))
            )}
        </div>
    );
};
