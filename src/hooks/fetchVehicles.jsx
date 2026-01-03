import { useEffect, useState } from "react";
import api from '../api.js';

export function useFetchVehicles(intervalMs = 60000, setTimeUpdated) {
    const [buses, setBuses] = useState([]);

    useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await api.get('/vehicles/current');
        const data = await response.data;
        console.log(`fetched vehicles`);
        setBuses(data); // or parse/transform as needed
        
        const date = new Date(data[0].timestamp);
        const options = {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        setTimeUpdated(date.toLocaleTimeString('en-US', options));
      } catch (err) {
        console.log("error in fetch vehicles: ", err);
      }
    };

    fetchBuses(); // initial fetch
    const interval = setInterval(fetchBuses, intervalMs);
    
    return () => clearInterval(interval);
  }, [intervalMs]);

  return { buses };
}