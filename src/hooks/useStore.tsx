import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { fireDB } from "libs/";
import { BikeType, isAdmin, ReservationType } from "utils/";
import { useAuth } from "./useAuth";

interface Props {
    bike?: BikeType;
}

export const useStore = ({ bike }: Props) => {
    const { auth } = useAuth();
    const [bikes, setBikes] = useState<BikeType[]>([]);
    const [loadingBikes, setLoadingBikes] = useState(true);
    const [bikeResa, setBikeReservation] = useState<ReservationType[]>([]);
    const [reservations, setReservations] = useState<ReservationType[]>([]);
    const [loadingResa, setLoadingResa] = useState(true);

    useEffect(() => {
        if (auth?.user) {
            let req = query(collection(fireDB, "reservations"), where("userId", "==", auth.user.uid));

            if (isAdmin(auth)) {
                req = query(collection(fireDB, "reservations"), orderBy("timestamp", "desc"));
            }

            const reservationListener = onSnapshot(req, (snapshot) => {
                let data: ReservationType[] = [];
                snapshot.forEach((doc) => {
                    data.push({ ...doc.data(), id: doc.id } as ReservationType);
                });
                setReservations(data.sort((a, b) => b.timestamp - a.timestamp));
                setLoadingResa(false);
            });

            return () => {
                reservationListener();
            };
        }
    }, [auth]);

    useEffect(() => {
        if (bike) {
            const bikes_listener = onSnapshot(
                query(collection(fireDB, "reservations"), where("bikeId", "==", bike.id)),
                (snapshot) => {
                    let data: ReservationType[] = [];
                    snapshot.forEach((doc) => {
                        data.push({ ...doc.data(), id: doc.id } as ReservationType);
                    });
                    setBikeReservation(data);
                }
            );

            return () => {
                bikes_listener();
            };
        } else {
            setBikeReservation([]);
        }
    }, [bike]);

    useEffect(() => {
        const reservationListener = onSnapshot(
            query(collection(fireDB, "bikes"), orderBy("lastupdate", "desc")),
            (snapshot) => {
                let data: BikeType[] = [];
                snapshot.forEach((doc) => {
                    data.push({ ...doc.data(), id: doc.id } as BikeType);
                });
                setBikes(data);
                setLoadingBikes(false);
            }
        );

        return () => {
            reservationListener();
        };
    }, []);

    return { bikes, loadingBikes, bikeResa, reservations, loadingResa };
};
