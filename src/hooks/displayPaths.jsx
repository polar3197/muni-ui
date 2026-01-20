

import { useEffect, useState } from 'react';
import api from '../api';
// this file establishes a useEffect process to monitor the displayed routes
// and refetch from api to update activePaths

const useDisplayPaths = (pathButton, displayedRoutes) => {
    const [ret, setRet] = useState([]);
    useEffect(() => {
        const updateActivePaths = async () => {
            try {
                console.log("BUTTON: ", pathButton);
                console.log("DRs: ", displayedRoutes);
                if (pathButton === 'Show Paths') {
                    console.log("SP");
                    setRet([]);
                } else if (pathButton === 'Hide Paths' && displayedRoutes.length > 0) {
                    console.log("HS");
                    console.log('Fetching routes:', displayedRoutes);

                    // fetches list of (shape_id, shape_geometry)
                    const response = await api.post('/paths/active', {route_ids: displayedRoutes});
                    // console.log("ACTIVE PATH RESPONSE: ", response);
                    if (response.length === 0) {
                        alert('No shapes found for actively displayed routes');
                        return;
                    }
                    
                    setRet(response.data);
                    
                }
            } catch (error) {
                console.error('Error fetching shapes:', error);
            }
        };

        updateActivePaths();
        console.log("ACTIVE PATHS: ", ret);
    }, [displayedRoutes, pathButton])
    return ret;
}

export default useDisplayPaths;