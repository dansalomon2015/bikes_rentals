import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fireDB } from "libs/";
import { BikeType } from "utils";

interface Props {
    bike?: BikeType;
}

export const useStore = ({ bike }: Props) => {
    const [bikes, setBikes] = useState<BikeType[]>([]);
    const [loadingBikes, setLoadingBikes] = useState(true);
    const [bikeResa, setBikeReservation] = useState([]);

    useEffect(() => {}, [bike]);

    useEffect(() => {
        const bikes_listener = onSnapshot(
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
            bikes_listener();
        };
    }, []);

    return { bikes, loadingBikes };
};
