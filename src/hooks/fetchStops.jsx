import { useEffect, useState } from "react";
import api from '../api.js';

export function useFetchStops(routeStops) {
    const [fetchedStops, setFetchedStops] = useState([]);

    useEffect(() => {
        const fetchStops = async () => {
            if (routeStops === 'none') {
                setFetchedStops('none');
                return;
            }
            try{
                const allStops = [];
                for (const routeId of routeStops) {
                    const response = await api.get(`/stops/${routeId}`);
                    if (response["status"] == 200 && response["data"].length > 0) { // validate response
                        allStops.push(response.data[0]);
                    }
                }
                if (allStops == []) {
                    setFetchedStops("none");
                } else {
                    setFetchedStops(allStops);
                }
            } catch (err) {
                console.log("error in fetch vehicles: ", err);
            }
        }
        
        fetchStops();
    }, [routeStops]);

    return { fetchedStops };
}
