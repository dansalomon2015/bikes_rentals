import React, { FC } from "react";
import { BikeType } from "utils";

interface Props {
    bikes: BikeType[];
    deleteBike: (bike: BikeType) => void;
    editBike: (bike: BikeType) => void;
}

export const BikesTableLayout: FC<Props> = ({ bikes, deleteBike, editBike }) => {
    if (!bikes.length) return <span className="text-xs">No data found</span>;
    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-16">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                    <tr>
                        <th scope="col" className="py-2 px-3">
                            #
                        </th>
                        <th scope="col" className="py-2 px-3">
                            Model
                        </th>
                        <th scope="col" className="py-2 px-3">
                            Color
                        </th>
                        <th scope="col" className="py-2 px-3">
                            Location
                        </th>
                        <th scope="col" className="py-2 px-3">
                            Avaible for rental
                        </th>
                        <th scope="col" className="py-2 px-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {bikes.map((bike, idx) => {
                        return (
                            <BikeItem
                                bike={bike}
                                idx={idx}
                                editBike={() => editBike(bike)}
                                deleteBike={() => deleteBike(bike)}
                                key={idx}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const BikeItem: FC<{ bike: BikeType; idx: number; editBike: () => void; deleteBike: () => void }> = ({
    bike,
    idx,
    editBike,
    deleteBike,
}) => {
    const { model, color, location, available } = bike;
    return (
        <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b`}>
            <td className="py-2 px-3">{idx + 1}</td>
            <td className="py-2 px-3">{model}</td>
            <td className="py-2 px-3">{color}</td>
            <td className="py-2 px-3">{location}</td>
            <td className="py-2 px-3">{available ? "YES" : "NO"}</td>
            <td>
                <span onClick={editBike} className="font-bold text-black cursor-pointer mr-4">
                    Edit
                </span>
                <span onClick={deleteBike} className="font-bold text-red-600 cursor-pointer">
                    Delete
                </span>
            </td>
        </tr>
    );
};
