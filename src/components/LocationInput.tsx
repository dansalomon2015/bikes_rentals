import React, { FC, useEffect, useRef, useState } from "react";
import { useSearch } from "hooks/";

interface Props extends React.HTMLProps<HTMLInputElement> {
    setLocation: (value: string) => void;
}

export const LocationInput: FC<Props> = ({ setLocation, disabled, value }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [dropDownVisible, setDropdownVisible] = useState(false);

    const [searchText, setSearchText] = useState("");
    const { result, loading } = useSearch({ queryParam: searchText });

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current) {
            // @ts-ignore
            if (!dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        }
    };

    const chooseLocation = (value: string) => {
        setDropdownVisible(false);
        setLocation(value);
        setSearchText("");
    };

    useEffect(() => {
        if (result.length) {
            setDropdownVisible(true);
        }
    }, [result]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">
                Location
            </label>
            <div className="relative">
                <input
                    name="location"
                    id="location"
                    className={`bg-gray-50 border ${
                        loading ? "loading" : ""
                    } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5`}
                    required
                    onChange={(e) => {
                        setLocation("");
                        setSearchText((e.target as HTMLInputElement).value);
                    }}
                    disabled={disabled}
                    value={value || searchText}
                    placeholder={"Location"}
                />
                <div ref={dropdownRef}>
                    {dropDownVisible && (
                        <div className="absolute p-2 z-10 w-full bg-white rounded divide-y divide-gray-100 shadow">
                            <ul className="py-1 text-sm text-gray-700">
                                {result.map((location) => {
                                    const {
                                        attributes: { name },
                                    } = location;
                                    return (
                                        <li
                                            className="py-1 cursor-pointer"
                                            key={location.id}
                                            onClick={() => chooseLocation(name)}
                                        >
                                            {name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
