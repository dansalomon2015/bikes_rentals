import { User } from "firebase/auth";
export type ROLE = "USER_ROLE" | "ADMIN_ROLE";
export type AuthUserType = {
    user: User;
    roles: ROLE[];
    username: string;
    timestamp?: number;
    email: string;
    location: string;
};
export enum COLORS {
    BLUE = "BLUE",
    BLACK = "BLACK",
    WHITE = "WHITE",
    YELLOW = "YELLOW",
    PINK = "PINK",
    RED = "RED",
    ORANGE = "ORANGE",
    GREEN = "GREEN",
    PURPLE = "PURPLE",
    GRAY = "GRAY",
    GOLD = "GOLD",
}

export enum BikeModels {
    TVS_Jupiter = "TVS Jupiter",
    TVS_Apache_RTR_160 = "TVS Apache RTR 160",
    TVS_Jupiter_125 = "TVS Jupiter 125",
    Hero_Splendor_Plus = "Hero Splendor Plus",
    Hero_HF_Deluxe = "Hero HF Deluxe",
    Hero_Passion_Pro = "Hero Passion Pro",
    Hero_Super_Splendor = "Hero Super Splendor",
    Hero_XPulse_200 = "Hero XPulse 200",
    Hero_Glamour = "Hero Glamour",
    Hero_XPulse_200T = "Hero XPulse 200T",
    Hero_Maestro_Xoom_110 = "Hero Maestro Xoom 110",
    Honda_SP_125 = "Honda SP 125",
    Honda_Shine = "Honda Shine",
    Honda_Dio = "Honda Dio",
    Honda_Unicorn = "Honda Unicorn",
    Honda_Activa_125 = "Honda Activa 125",
    Honda_CB350RS = "Honda CB350RS",
    Bajaj_Pulsar_150 = "Bajaj Pulsar 150",
    Bajaj_Pulsar_125 = "Bajaj Pulsar 125",
    Bajaj_Pulsar_NS_125 = "Bajaj Pulsar NS 125",
    Bajaj_Pulsar_N160 = "Bajaj Pulsar N160",
}

export type BikeType = {
    id?: string;
    model: string;
    color: COLORS;
    location: string;
    available: boolean;
    createdBy?: string;
};

export type LocationType = {
    id: string;
    attributes: {
        name: string;
    };
};

export type ReservationType = {
    id?: string;
    endDate: string;
    bikeId: string;
    userId: string;
    startDate: string;
    timestamp: number;
    bike: {
        location: string;
        model: string;
        color: COLORS;
    };
    user: {
        email: string;
        username: string;
    };
};
