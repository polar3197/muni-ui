import {useMemo} from 'react'

// [] = show all, ['N', etc.] = show specified, null = show none
export function useFilterVehicles(buses, selectedNeighborhoods, selectedRoutes) {
    return useMemo(() => {
        // null = show none
        if (selectedRoutes === null || selectedNeighborhoods === null) {
            return [];
        }

        // [] = show all, otherwise filter by specified routes
        let filtered = selectedRoutes.length === 0
            ? buses
            : buses.filter(b => selectedRoutes.includes(b.route_id));

        // [] = show all, otherwise filter by specified neighborhoods
        filtered = selectedNeighborhoods.length === 0
            ? filtered
            : filtered.filter(b =>
                b.neighborhood && selectedNeighborhoods.some(n =>
                    n.toLowerCase() === b.neighborhood.toLowerCase()
                )
            );

        return filtered;
    }, [buses, selectedNeighborhoods, selectedRoutes])
}