import React, { useState } from "react";
import { useAuth } from "hooks/";
import { Link } from "react-router-dom";
import { Alert, NewUserForm } from "components/";

export const Register = () => {
    const { authError } = useAuth();
    const [complete, setComplete] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className="relative bg-yellow-400 flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                {!complete ? (
                    <>
                        <h1 className="text-3xl font-semibold text-center text-black underline">Register</h1>

                        <div data-testid="errorMessageId">
                            <Alert message={error || authError} />
                        </div>

                        <NewUserForm
                            cancelError={() => setError("")}
                            buttonTitle={"Register"}
                            setComplete={(status, email) => {
                                setComplete(status);
                                setEmail(email);
                            }}
                            setError={setError}
                            roles={["USER_ROLE"]}
                        />

                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                            Already have an account ?
                            <span className="ml-1 font-medium text-yellow-600 hover:underline cursor-pointer">
                                <Link to="/login">Log in</Link>
                            </span>
                        </p>
                    </>
                ) : (
                    <div>
                        <p>Your account has been created !</p>
                        <p>An confirmation email has been sent to {email}</p>
                        <p className="test-xs">Check your spam if you don't see the email</p>

                        <p className="cursor-pointer hover:underline mt-3">
                            <Link to={"/login"}>Go to login page</Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
