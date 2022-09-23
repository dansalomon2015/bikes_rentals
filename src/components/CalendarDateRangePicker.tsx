import React, { FC, useCallback, useEffect, useRef } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Loader } from "./Loader";

interface Props {
    visible: boolean;
    hideCalendar: () => void;
    loading?: boolean;
    validate: (range: { startDate: Date; endDate: Date }) => void;
}

export const CalendarDateRangePicker: FC<Props> = ({ visible, hideCalendar, validate, loading = false }) => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const [selectionRange, setSelectionRange] = React.useState({
        startDate: new Date(),
        endDate: addDays(new Date(), 2),
        key: "selection",
    });
    const handleSelect = (ranges: RangeKeyDict) => {
        const {
            selection: { startDate, endDate },
        } = ranges;

        setSelectionRange({
            startDate: new Date(startDate as Date),
            endDate: new Date(endDate as Date),
            key: "selection",
        });
    };

    const validateBooking = () => {
        validate({ startDate: selectionRange.startDate, endDate: selectionRange.endDate });
    };

    // Hide calendar on outside click
    const hideOnClickOutside = useCallback(
        (e: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(e.target as HTMLElement)) {
                if (!loading) hideCalendar();
            }
        },
        [hideCalendar, loading]
    );

    useEffect(() => {
        document.addEventListener("click", hideOnClickOutside, true);
        return () => {
            document.removeEventListener("click", hideOnClickOutside);
        };
    }, [hideOnClickOutside]);

    if (!visible) return null;
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                        ref={calendarRef}
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all "
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                                        Pick a date range
                                    </h3>
                                    <div className="mt-2">
                                        <DateRangePicker
                                            ranges={[selectionRange]}
                                            onChange={handleSelect}
                                            minDate={new Date()}
                                            staticRanges={[]}
                                            inputRanges={[]}
                                            moveRangeOnFirstSelection={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-2 flex justify-center">
                            <Loader loading={loading} />
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                onClick={validateBooking}
                                type="button"
                                disabled={loading}
                                className="inline-flex w-full justify-center rounded-md border border-transparent hover:text-white bg-yellow-400 px-4 py-2 text-base font-medium text-dark shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Validate
                            </button>
                            <button
                                onClick={hideCalendar}
                                type="button"
                                disabled={loading}
                                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
