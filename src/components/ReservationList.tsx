import React, { useEffect } from "react";
import { useAuth, useStore } from "hooks/";
import { dateToLocale, isAdmin, ReservationType } from "utils/";
import { DialogBox } from "./DialogBox";
import { deleteReservation, saveBikeRating } from "api/";
import { Loader } from "./Loader";

export const ReservationList = () => {
    const { reservations, loadingResa } = useStore({});
    const { auth } = useAuth();

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
                        {isAdmin(auth) && (
                            <th scope="col" className="py-2 px-3">
                                Reserved by
                            </th>
                        )}
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
        userId,
        bikeId,
    } = reservation;

    const { auth } = useAuth();
    const { userRate } = useStore({ reservation });
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const [ratingFormVisible, setRatingFormVisible] = React.useState(false);
    const [ratingValue, setRatingValue] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const cancelResa = () => {
        setDialogVisible(false);
        deleteReservation(id!);
    };

    const rateBike = async () => {
        if (ratingValue) {
            setLoading(true);
            let r = { ...userRate!, rating: ratingValue, userId, bikeId };
            await saveBikeRating(r);
            setRatingFormVisible(false);
            setLoading(false);
        } else {
            alert("Should enter a number between 1 and 5 ");
        }
    };

    useEffect(() => {
        if (userRate) {
            setRatingValue(userRate.rating);
        }
    }, [userRate]);

    return (
        <>
            <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b`}>
                <td className="py-2 px-3">{idx + 1}</td>
                <td className="py-2 px-3">{model}</td>
                <td className="py-2 px-3">{color}</td>
                <td className="py-2 px-3">{location}</td>
                <td className="py-2 px-3">{dateToLocale(startDate)}</td>
                <td className="py-2 px-3">{dateToLocale(endDate)}</td>
                {isAdmin(auth) && (
                    <td className="py-2 px-3">
                        {username} | {email}
                    </td>
                )}
                <td className="py-2 px-3">{new Date(timestamp).toLocaleString()}</td>
                {ratingFormVisible ? (
                    <td>
                        {loading ? (
                            <Loader loading={true} />
                        ) : (
                            <form>
                                <span>
                                    <input
                                        className="  px-4 py-2 mr-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        type={"number"}
                                        required
                                        min={1}
                                        max={5}
                                        onChange={(e) => setRatingValue(parseInt(e.target.value))}
                                        defaultValue={ratingValue}
                                    />
                                </span>
                                <span onClick={rateBike} className="font-bold text-black cursor-pointer mr-4">
                                    Save
                                </span>
                                <span
                                    onClick={() => setRatingFormVisible(false)}
                                    className="font-bold text-red-600 cursor-pointer"
                                >
                                    Close
                                </span>
                            </form>
                        )}
                    </td>
                ) : (
                    <td>
                        {!isAdmin(auth) && (
                            <span
                                onClick={() => setRatingFormVisible(true)}
                                className="font-bold text-black cursor-pointer mr-4"
                            >
                                Rate
                            </span>
                        )}
                        <span onClick={() => setDialogVisible(true)} className="font-bold text-red-600 cursor-pointer">
                            Cancel
                        </span>
                    </td>
                )}
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
