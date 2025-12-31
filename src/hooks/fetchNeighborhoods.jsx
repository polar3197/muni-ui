import { useEffect, useState } from "react";
import api from '../api.js';

export function useFetchNeighborhoods(nbrhd) {
    // we will access api enpoint to fetch coordinates
    const [nbrhd, setNbrhd] = useState(null);

    useEffect(() => {
        const fetchNeighborhoods = async() => {
            try {
                const response = await api.get(`/neighborhoods/${nbrhd}`);
                const data = await response.data;
                setNbrhd(data); // or parse/transform as needed
            } catch (err) {
                console.log("error in fetch vehicles: ", err);
            }
        };
        
        if (nbrhd) {  // Added: only fetch if nbrhd exists
            fetchNeighborhood();
        }
    }, [nbrhd]);

    // then return coordinates in way that is easiest to map
}