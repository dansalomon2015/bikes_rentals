import { useState, useEffect } from "react";
import { getLocations } from "api/";
import { LocationType } from "utils/";
import lodash from "lodash";

interface Props {
    queryParam: string;
}

const searchQuery = (
    queryParam: string,
    setResults: (result: any[]) => void,
    setLoading: (loading: boolean) => void
) => {
    getLocations(queryParam).then((response) => {
        if (response) {
            const { data } = response;
            setLoading(false);
            setResults(data);
        }
    });
};

const debouncer = lodash.debounce(searchQuery);
const search = debouncer;

export const useSearch = ({ queryParam }: Props) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<LocationType[]>([]);

    useEffect(() => {
        if (!queryParam) {
            setLoading(false);
            setResult([]);
            search.cancel();
        } else {
            setLoading(true);
            search(queryParam.trim(), setResult, setLoading);
        }
    }, [queryParam]);

    return {
        result,
        loading,
    };
};
