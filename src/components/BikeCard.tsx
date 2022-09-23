import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiMotorbike } from "@mdi/js";
import { BikeType } from "utils/";
import { CalendarDateRangePicker } from "./CalendarDateRangePicker";
import ErrorBoundary from "./ErrorBoundary";
import { useAuth } from "hooks/";
import { addReservation } from "api/";
import { Alert } from "./Alert";

export const BikeCard: React.FC<{ bike: BikeType }> = ({ bike }) => {
    const { auth } = useAuth();
    const { model, color, location } = bike;
    const [calenVisible, setCalendarVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const reserveBike = (endDate: Date, startDate: Date) => {
        setLoading(true);
        setSuccess(false);
        addReservation(bike, startDate.toUTCString(), endDate.toUTCString(), auth!)
            .then(() => {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            })
            .catch((e) => setError(e))
            .finally(() => {
                setLoading(false);
                setCalendarVisible(false);
            });
    };

    return (
        <div className="box rounded overflow-hidden shadow-md border">
            <div className="flex items-center px-3 py-3">
                <Icon path={mdiMotorbike} size={1} color="black" />
                <span className="pl-2 text-sm font-bold ">{model}</span>
            </div>
            <div className="p-3">
                <table className="text-sm text-left text-gray-500">
                    <tbody>
                        <tr>
                            <td>Color :</td>
                            <td>{color}</td>
                        </tr>
                        <tr>
                            <td>Location :</td>
                            <td>{location}</td>
                        </tr>
                        <tr>
                            <td>Rating :</td>
                            <td>4.5 / 5</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-gray-100 p-2 mt-3 flex">
                <div className="">
                    {success && <Alert message="Reservation complete" type="success" />}
                    <Alert message={error} />
                </div>
                <div className="flex ml-auto">
                    <button
                        className=" ml-auto block text-white bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-2 py-1 text-center"
                        type="button"
                        onClick={() => setCalendarVisible(true)}
                    >
                        Book
                    </button>

                    <button
                        className=" ml-4 block text-black hover:text-white bg-yellow-400 hover:bg-gray-600 focus:ring-1 focus:outline-none focus:ring-gray-800 font-medium rounded-lg text-xs px-2 py-1 text-center"
                        type="button"
                    >
                        Rate
                    </button>
                </div>
            </div>

            <ErrorBoundary>
                <CalendarDateRangePicker
                    visible={calenVisible}
                    hideCalendar={() => setCalendarVisible(false)}
                    loading={loading}
                    validate={reserveBike}
                />
            </ErrorBoundary>
        </div>
    );
};
