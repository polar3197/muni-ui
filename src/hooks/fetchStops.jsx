import { useEffect, useState } from "react";
import api from '../api.js';

export function useFetchStops(routeStops) {
    const [fetchedStops, setFetchedStops] = useState([]);

    useEffect(() => {
        const fetchStops = async () => {
            console.log("In fetch: ", routeStops)
            if (routeStops === 'none') {
                setFetchedStops('none');
                return;
            }
            try{
                const allStops = [];
                for (const routeId of routeStops) {
                    console.log("route: ", routeId);
                    const response = await api.get(`/stops/${routeId}`);
                    console.log("response: ", response.data[0]);
                    allStops.push(response.data[0]);
                }
                setFetchedStops(allStops);
                console.log(allStops);
            } catch (err) {
                console.log("error in fetch vehicles: ", err);
            }
        }
        
        fetchStops();
    }, [routeStops]);

    return { fetchedStops };
}
