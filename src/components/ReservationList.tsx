import React from "react";
import { useStore } from "hooks/";
import { dateToLocale, ReservationType } from "utils";
import { DialogBox } from "./DialogBox";
import { deleteReservation } from "api";

export const ReservationList = () => {
    const { reservations, loadingResa } = useStore({});

    return loadingResa ? (
        <span className="text-xs">Loading reservations list...</span>
    ) : !reservations.length ? (
        <span className="text-xs">No data found</span>
    ) : (
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
                            Start date
                        </th>
                        <th scope="col" className="py-2 px-3">
                            End Date
                        </th>
                        <th scope="col" className="py-2 px-3">
                            Reserved by
                        </th>
                        <th scope="col" className="py-2 px-3">
                            Reserved on
                        </th>
                        <th scope="col" className="py-2 px-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation, idx) => {
                        return <ResaItem reservation={reservation} idx={idx} key={idx} />;
                    })}
                </tbody>
            </table>
        </div>
    );
};

const ResaItem: React.FC<{ reservation: ReservationType; idx: number }> = ({ reservation, idx }) => {
    const {
        id,
        bike: { model, color, location },
        startDate,
        endDate,
        user: { username, email },
        timestamp,
    } = reservation;

    const [dialogVisible, setDialogVisible] = React.useState(false);

    const cancelResa = () => {
        setDialogVisible(false);
        deleteReservation(id!);
    };

    return (
        <>
            <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b`}>
                <td className="py-2 px-3">{idx + 1}</td>
                <td className="py-2 px-3">{model}</td>
                <td className="py-2 px-3">{color}</td>
                <td className="py-2 px-3">{location}</td>
                <td className="py-2 px-3">{dateToLocale(startDate)}</td>
                <td className="py-2 px-3">{dateToLocale(endDate)}</td>
                <td className="py-2 px-3">
                    {username} | {email}
                </td>
                <td className="py-2 px-3">{new Date(timestamp).toLocaleString()}</td>
                <td>
                    <span onClick={() => setDialogVisible(true)} className="font-bold text-red-600 cursor-pointer">
                        Cancel
                    </span>
                </td>
            </tr>
            <DialogBox
                visible={dialogVisible}
                title={`Confirm Deletion`}
                message={`Delete Reservation for the bike ${model}`}
                onCancel={() => setDialogVisible(false)}
                onAccept={cancelResa}
            />
        </>
    );
};
