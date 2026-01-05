import {useMemo} from 'react'

export function useFilterVehicles(buses, selectedNeighborhood, selectedRoutes) {
    return useMemo(() => {
        /* ========== ROUTE FILTER LOGIC ======================== */
        let filtered = selectedRoutes === 'all' 
            ? buses 
            : buses.filter(b =>  selectedRoutes.includes(b.route_id));

        /* ========== NEIGHBORHOOD FILTER LOGIC ================= */
        filtered = selectedNeighborhood === 'all'
            ? filtered
            : filtered.filter(b => 
                b.neighborhood && selectedNeighborhood.includes(b.neighborhood.toLowerCase())
            );
        
        return filtered;
    }, [buses, selectedNeighborhood, selectedRoutes])
}