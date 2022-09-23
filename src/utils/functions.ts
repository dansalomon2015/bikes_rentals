import { ROLES } from "./constants";
import { AuthUserType } from "./types";

export const removeSpaces = (text: string | undefined): string => {
    if (!text) return "";
    if (text) return text.replace(/\s/g, "");
    return "";
};

export const isEmail = (emailAdress: string) => {
    //  eslint-disable-next-line
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(removeSpaces(emailAdress.trim()));
};

export const isAdmin = (auth: AuthUserType | undefined) => {
    if (!auth) return false;
    if (!auth.user) return false;
    return auth.roles.includes(ROLES.Admin);
};
