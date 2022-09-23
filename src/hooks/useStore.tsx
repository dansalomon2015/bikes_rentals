import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { fireDB } from "libs/";
import { BikeType, isAdmin, RatingType, ReservationType } from "utils/";
import { useAuth } from "./useAuth";

interface Props {
    bike?: BikeType;
    reservation?: ReservationType;
}

export const useStore = ({ bike, reservation }: Props) => {
    const { auth } = useAuth();
    const [bikes, setBikes] = useState<BikeType[]>([]);
    const [loadingBikes, setLoadingBikes] = useState(true);
    const [bikeResa, setBikeReservation] = useState<ReservationType[]>([]);
    const [reservations, setReservations] = useState<ReservationType[]>([]);
    const [loadingResa, setLoadingResa] = useState(true);
    const [userRate, setUserRate] = useState<RatingType>();
    const [bikeRating, setBikeRating] = useState(0);

    useEffect(() => {
        if (reservation) {
            const rating_listener = onSnapshot(
                query(
                    collection(fireDB, "ratings"),
                    where("bikeId", "==", reservation.bikeId),
                    where("userId", "==", reservation.userId)
                ),
                (snapshot) => {
                    let data: RatingType[] = [];
                    snapshot.forEach((doc) => {
                        data.push({ ...doc.data(), id: doc.id } as RatingType);
                    });
                    if (data.length) setUserRate(data[0]);
                }
            );

            return () => {
                rating_listener();
            };
        }
    }, [reservation]);

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
            const bike_reservations_listener = onSnapshot(
                query(collection(fireDB, "reservations"), where("bikeId", "==", bike.id)),
                (snapshot) => {
                    let data: ReservationType[] = [];
                    snapshot.forEach((doc) => {
                        data.push({ ...doc.data(), id: doc.id } as ReservationType);
                    });
                    setBikeReservation(data);
                }
            );

            const bike_ratings_listener = onSnapshot(
                query(collection(fireDB, "ratings"), where("bikeId", "==", bike.id)),
                (snapshot) => {
                    let data: RatingType[] = [];
                    snapshot.forEach((doc) => {
                        data.push({ ...doc.data(), id: doc.id } as RatingType);
                    });
                    if (!!data.length)
                        setBikeRating(data.reduce((sum, rating) => (sum += rating.rating), 0) / data.length);
                }
            );

            return () => {
                bike_reservations_listener();
                bike_ratings_listener();
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

    return { bikes, loadingBikes, bikeResa, reservations, loadingResa, userRate, bikeRating };
};
