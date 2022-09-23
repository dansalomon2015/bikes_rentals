import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "libs";
import { useEffect, useState } from "react";
import { BikeType } from "utils";

export const useStore = () => {
    const [bikes, setBikes] = useState<BikeType[]>([]);
    const [loadingBikes, setLoadingBikes] = useState(true);

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
