import React, { useState } from "react";
import { useAuth } from "hooks/";
import { Link, Navigate } from "react-router-dom";
import { isEmail, PASSWORD_MIN_LENGTH, ROLES } from "utils/";
import { Alert, DialogBox, Loader } from "components/";

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
            return <Navigate to={"/admin"} />;
        } else {
            return <Navigate to={"/home"} />;
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

                    <Loader loading={loading} />

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
