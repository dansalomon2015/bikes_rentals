import React from "react";
import Icon from "@mdi/react";
import { mdiMotorbike } from "@mdi/js";
import { BikeType } from "utils/";
import { CalendarDateRangePicker } from "./CalendarDateRangePicker";
import ErrorBoundary from "./ErrorBoundary";

export const BikeCard: React.FC<{ bike: BikeType }> = ({ bike }) => {
    const { model, color, location, available } = bike;
    const [calenVisible, setCalendarVisible] = React.useState(false);

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
                {available ? (
                    <button
                        className=" ml-auto block text-white bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-2 py-1 text-center"
                        type="button"
                    >
                        Book
                    </button>
                ) : (
                    <span className="ml-auto text-xs text-red-400">Not available for rental</span>
                )}
                <button
                    className=" ml-4 block text-black hover:text-white bg-yellow-400 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-800 font-medium rounded-lg text-xs px-2 py-1 text-center"
                    type="button"
                >
                    Rate
                </button>
            </div>

            <ErrorBoundary>
                <CalendarDateRangePicker visible={calenVisible} hideCalendar={() => setCalendarVisible(false)} />
            </ErrorBoundary>
        </div>
    );
};
