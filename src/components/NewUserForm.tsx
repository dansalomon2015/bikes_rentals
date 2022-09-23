import React, { useState } from "react";
import { LocationInput } from "./LocationInput";
import { useAuth } from "hooks/";
import { isEmail, PASSWORD_MIN_LENGTH, ROLE } from "utils/";

interface Props {
    cancelError: () => void;
    buttonTitle: string;
    setComplete: (status: boolean, email: string) => void;
    setError: (value: string) => void;
    roles: ROLE[];
}

export const NewUserForm: React.FC<Props> = ({ cancelError, buttonTitle, setComplete, setError, roles }) => {
    const { createUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [location, setLocation] = useState("");

    const _register = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email);
        if (!isEmail(email)) return setError("Invalid email adress !");
        if (password.trim().length < PASSWORD_MIN_LENGTH) return setError("Password too short !");
        if (!(password === confirmPassword)) return setError("Passwords do not match!");
        if (!location) return setError("Please Select a location!");

        setLoading(true);
        // @ts-ignore
        createUser(email, password, username, roles, location)
            .then((response) => {
                setError("");
                if (response) {
                    setComplete(response.complete, email);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <form className="mt-6" onSubmit={_register}>
            <div className="mb-2">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-800">
                    Name
                </label>
                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    onFocus={cancelError}
                    name="username"
                    placeholder="Your name"
                    disabled={loading}
                    className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mb-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                    Email
                </label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    onFocus={cancelError}
                    name="email"
                    placeholder="Email"
                    disabled={loading}
                    className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                    Password
                </label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    onFocus={cancelError}
                    name="password"
                    placeholder="Password"
                    disabled={loading}
                    className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <p className="mt-1 text-right text-xs font-light  text-gray-700">Min. length : 5</p>
            </div>
            <div className="mb-2">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800">
                    Confirm Password
                </label>
                <input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    onFocus={cancelError}
                    name="confirmPassword"
                    disabled={loading}
                    placeholder="Confirm password"
                    className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>

            <div className="mb-2">
                <LocationInput value={location} setLocation={setLocation} disabled={loading} />
            </div>

            {loading && (
                <div role="status" className="my-2">
                    <svg
                        aria-hidden="true"
                        className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-black fill-yellow-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                </div>
            )}

            <div className="mt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full disabled:bg-gray-500 disabled:cursor-not-allowed px-4 py-2 tracking-wide text-black transition-colors duration-200 transform bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                >
                    {buttonTitle}
                </button>
            </div>
        </form>
    );
};
