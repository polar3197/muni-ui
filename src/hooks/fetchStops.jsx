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
                    allStops.push(response.data[0]);
                }
                setFetchedStops(allStops);
            } catch (err) {
                console.log("error in fetch vehicles: ", err);
            }
        }
        
        fetchStops();
    }, [routeStops]);

    return { fetchedStops };
}
