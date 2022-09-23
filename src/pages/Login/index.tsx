import React, { useState } from "react";
import { useAuth } from "hooks/";
import { Link, Navigate } from "react-router-dom";
import { isEmail, PASSWORD_MIN_LENGTH, ROLES } from "utils/";
import { Alert, DialogBox } from "components/";

export const Login = () => {
    const { identifyUser, resendConfirmationEmail, authError, auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [verificationEmailSent, setVerificationEmailSent] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);

    const _login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isEmail(email)) return setError("Invalid email adress !");
        if (password.trim().length < PASSWORD_MIN_LENGTH) return setError("Password too short !");

        setLoading(true);

        // @ts-ignore
        identifyUser(email, password)
            .then((response) => {
                setError("");
                if (response) {
                    if (!response.emailVerified) {
                        setError("Email not verified. Please ");
                        setDialogVisible(true);
                    }
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const resendVerifEmail = () => {
        setLoading(true);
        setDialogVisible(false);
        setError("");
        // @ts-ignore
        resendConfirmationEmail(email, password)
            .then((response) => {
                if (response) {
                    setVerificationEmailSent(response.verificationEmailSent);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (auth?.user) {
        if (auth.roles.includes(ROLES.Admin)) {
            return <Navigate to={"/home/admin"} />;
        } else {
            return <Navigate to={"/home/user"} />;
        }
    }

    return (
        <div className="relative bg-yellow-400 flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-black underline">Log in</h1>
                <div data-testid="errorMessageId">
                    <Alert message={error || authError} />
                </div>
                <div>{verificationEmailSent && <Alert message="Verification email sent" type="success" />}</div>
                <form className="mt-6" onSubmit={_login}>
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                            Email
                        </label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            onFocus={() => setError("")}
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
                            onFocus={() => setError("")}
                            name="password"
                            placeholder="Password"
                            disabled={loading}
                            className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        <p className="mt-1 text-right text-xs font-light  text-gray-700">Min. length : 5</p>
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
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    Don't have an account?
                    <span className="ml-1 font-medium text-yellow-600 hover:underline cursor-pointer">
                        <Link to="/register">Register</Link>
                    </span>
                </p>
            </div>

            <DialogBox
                title="Email not confirmed"
                message={`Your email is not verified.\nResend the verification link ?`}
                onCancel={() => setDialogVisible(false)}
                onAccept={resendVerifEmail}
                visible={dialogVisible}
            />
        </div>
    );
};
