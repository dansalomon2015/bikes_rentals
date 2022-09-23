import React, { createContext, useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { AuthUserType, ROLE, USER_DATA } from "utils/";
import { getExtendedUser, logOut, saveUser, sendVerificationEmail, signIn, signUp } from "api/";
import { fireAuth } from "libs/";

export interface AuthContextInterface {
    auth?: AuthUserType;
    identifyUser?: (
        email: string,
        password: string
    ) => Promise<void | {
        emailVerified: boolean;
    }>;
    createUser?: (
        email: string,
        password: string,
        username: string,
        roles: ROLE[],
        location: string,
        createdBy?: string
    ) => Promise<void | {
        complete: boolean;
        userId: string;
    }>;
    signOut?: () => Promise<void>;
    resendConfirmationEmail?: (
        email: string,
        password: string
    ) => Promise<void | {
        verificationEmailSent: boolean;
    }>;
    authError?: string;
}

export const AuthContext = createContext<AuthContextInterface>({});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [auth, setAuth] = useState<AuthUserType | undefined>(
        localStorage.getItem(USER_DATA) ? JSON.parse(localStorage.getItem(USER_DATA) + "") : undefined
    );
    const [authError, setAuthError] = useState("");

    const identifyUser = (email: string, password: string) => {
        setAuthError("");
        return signIn(email, password)
            .then(async (response) => {
                const {
                    user: { emailVerified },
                } = response;
                return { emailVerified };
            })
            .catch((error) => {
                console.log(error);
                handleError(error + "");
            });
    };

    const getUserData = useCallback(async (currentUser: User) => {
        const { uid } = currentUser;
        let extendedUser = await getExtendedUser(uid);

        if (extendedUser.exists()) {
            try {
                const { username, roles, timestamp, location, email } = extendedUser.data();
                let userdata = {
                    user: currentUser,
                    roles,
                    username,
                    timestamp,
                    location,
                    email,
                } as unknown as AuthUserType;
                localStorage.setItem(USER_DATA, JSON.stringify(userdata));
                setAuth(userdata);
            } catch (error) {
                handleError(error + "");
            }
        } else {
            setAuthError("Unable to find this user ! ");
        }
    }, []);

    const createUser = async (
        email: string,
        password: string,
        username: string,
        roles: ROLE[],
        location: string,
        createdBy?: string
    ) => {
        setAuthError("");
        return signUp(email, password)
            .then(async (response) => {
                const { user } = response;
                await sendVerificationEmail(user);
                await saveUser(username, email, user.uid, roles, location, createdBy);
                await logOut();
                return { complete: true, userId: user.uid };
            })
            .catch((error) => {
                handleError(error + "");
            });
    };

    const resendConfirmationEmail = async (email: string, password: string) => {
        setAuthError("");
        return signIn(email, password)
            .then(async (response) => {
                await sendVerificationEmail(response.user);
                return { verificationEmailSent: true };
            })
            .catch((error) => {
                handleError(error + "");
            });
    };

    const signOut = async () => {
        await logOut();
        await localStorage.clear();
    };

    const handleError = (error: string) => {
        if (error.includes("email-already-in-use")) return setAuthError("Email alreayd in use !");
        if (error.includes("wrong-password")) return setAuthError("Email or password incorrect!");
        setAuthError("An unexpected error occurs !");
    };

    useEffect(() => {
        onAuthStateChanged(fireAuth, async (currentUser) => {
            if (currentUser) {
                const { emailVerified } = currentUser;
                if (emailVerified) {
                    getUserData(currentUser);
                }
                setAuthError("");
            } else {
                setAuth(undefined);
            }
        });
    }, [getUserData]);

    return (
        <AuthContext.Provider value={{ auth, identifyUser, createUser, signOut, resendConfirmationEmail, authError }}>
            {children}
        </AuthContext.Provider>
    );
};
