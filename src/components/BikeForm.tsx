import React, { FC, useEffect, useState } from "react";
import { BikeModels, BikeType, COLORS } from "utils/";
import { LocationInput } from "./LocationInput";
import { Alert } from "./Alert";

interface Props {
    bike?: BikeType;
    visible?: boolean;
    hide?: () => void;
    save: (bike: BikeType) => void;
    isLoading?: boolean;
    success?: boolean;
    error?: string;
}

export const BikeForm: FC<Props> = ({ bike, visible, hide, save, isLoading, error, success }) => {
    const [location, setLocation] = useState("");
    const [color, setColor] = useState<COLORS | undefined>(COLORS.BLUE);
    const [available, setAvailable] = useState<boolean>(true);
    const [model, setModel] = useState(BikeModels.Bajaj_Pulsar_125);
    const [formError, setFormError] = useState("");

    const saveBike = () => {
        setFormError("");
        if (!location) return setFormError("Please provide a location");
        save({
            color: color!,
            model,
            location,
            available,
        });
    };

    useEffect(() => {
        if (bike) {
            setLocation(bike.location);
            setColor(bike.color);
            setAvailable(bike.available);
            setModel(bike.model as BikeModels);
        } else {
            setLocation("");
        }
    }, [bike]);

    useEffect(() => {
        if (success) setLocation("");
    }, [success]);

    if (!visible) return null;
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                                        {bike ? "Edit Bike" : "New Bike"}
                                    </h3>
                                    <div>
                                        <p className="text-xs text-gray-400 ">
                                            {isLoading && <span>Processing...</span>}
                                        </p>
                                    </div>
                                    <div className="py-6 lg:px-8">
                                        <form className="space-y-6">
                                            <div>
                                                <label
                                                    htmlFor="color"
                                                    className="block mb-2 text-sm font-medium text-gray-900"
                                                >
                                                    Color
                                                </label>
                                                <select
                                                    name="color"
                                                    id="color"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                                                    onChange={(e) => setColor(e.target.value as COLORS)}
                                                    defaultValue={color}
                                                    disabled={isLoading}
                                                >
                                                    {Object.values(COLORS).map((c) => (
                                                        <option key={c} value={c}>
                                                            {c}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="model"
                                                    className="block mb-2 text-sm font-medium text-gray-900"
                                                >
                                                    Model
                                                </label>
                                                <select
                                                    name="model"
                                                    id="model"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                                                    onChange={(e) => setModel(e.target.value as BikeModels)}
                                                    defaultValue={model}
                                                    disabled={isLoading}
                                                >
                                                    {Object.values(BikeModels)
                                                        .sort()
                                                        .map((m) => (
                                                            <option key={m} value={m}>
                                                                {m}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                            <LocationInput
                                                value={location}
                                                setLocation={setLocation}
                                                disabled={isLoading}
                                            />
                                            <div className="flex justify-between">
                                                <div className="flex items-start">
                                                    <div className="flex items-center h-5">
                                                        <input
                                                            id="remember"
                                                            type="checkbox"
                                                            checked={!!available}
                                                            className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-yellow-300"
                                                            onChange={() => setAvailable(!available)}
                                                        />
                                                    </div>
                                                    <label
                                                        htmlFor="remember"
                                                        className="ml-2 text-sm font-medium text-gray-900"
                                                    >
                                                        Available for rental
                                                    </label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    <Alert message={formError || error} />
                                    <Alert message={success ? "Successful operation" : ""} type="success" />
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    onClick={saveBike}
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={hide}
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
