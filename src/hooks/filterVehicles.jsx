import {useMemo} from 'react'

// [] = show all, ['N', etc.] = show specified, null = show none
export function useFilterVehicles(buses, selectedNeighborhoods, selectedRoutes, nearbyShapeIds = []) {
    return useMemo(() => {
        // null = show none
        if (selectedRoutes === null || selectedNeighborhoods === null) {
            return [];
        }

        // If destination selected (nearbyShapeIds has values), filter by shape_id
        if (nearbyShapeIds.length > 0) {
            return buses.filter(b => nearbyShapeIds.includes(b.shape_id));
        }

        // Otherwise use existing route/neighborhood filters
        // [] = show all, otherwise filter by specified routes
        let displayedVehicles = selectedRoutes.length === 0
            ? buses
            : buses.filter(b => selectedRoutes.includes(b.route_id));

        // [] = show all, otherwise filter by specified neighborhoods
        displayedVehicles = selectedNeighborhoods.length === 0
            ? displayedVehicles
            : displayedVehicles.filter(b =>
                b.neighborhood && selectedNeighborhoods.some(n =>
                    n.toLowerCase() === b.neighborhood.toLowerCase()
                )
            );

        return displayedVehicles;
    }, [buses, selectedNeighborhoods, selectedRoutes, nearbyShapeIds])
}