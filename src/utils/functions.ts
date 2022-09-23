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

export const getTime = (date: Date): number => new Date(date.setHours(0)).getTime();

export const isDateBetween = (endDate: Date, startDate: Date, date: Date) => {
    // console.log("---------------");
    // console.log(startDate, getTime(startDate) <= getTime(date));
    // console.log(date);
    // console.log("End Date ", endDate, getTime(date) >= getTime(date));
    // console.log("---------------");

    return getTime(endDate) >= getTime(date) && getTime(startDate) <= getTime(date);
};

export const dateToLocale = (d: string | number) => {
    if (!d) return null;
    var date = new Date(d);
    return (
        date.toLocaleDateString("en-US", { day: "2-digit" }) +
        " " +
        date.toLocaleDateString("en-US", { month: "long" }) +
        " " +
        date.toLocaleDateString("en-US", { year: "numeric" })
    );
};
