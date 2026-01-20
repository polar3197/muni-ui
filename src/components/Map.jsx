// components/Map.jsx
import { MapContainer, TileLayer} from 'react-leaflet';
import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css';
import '../css/Map.css';

import { useFetchVehicles } from '../hooks/fetchVehicles';
import { useFilterVehicles } from '../hooks/filterVehicles';
import useUserLocation from '../hooks/useUserLocation';
import VehicleMarker from './VehicleMarker';
import RouteShape from './RouteShape';
import UserLocationMarker from './UserLocationMarker';

export default function Map({
  setVehicleCount,
  setTimeUpdated,
  selectedNeighborhoods,
  selectedRoutes,
  activePaths,
  setDisplayedRoutes,
}) {
    const sf = [37.7749, -122.447];
    const position = sf;

    const { buses } = useFetchVehicles(60000, setTimeUpdated);
    const { filteredVehicles, displayedRoutes } = useFilterVehicles(buses, selectedNeighborhoods, selectedRoutes, setDisplayedRoutes);
    const { userLocation, locationError } = useUserLocation();

    useEffect(() => {
        if (locationError) {
            console.log('Location error:', locationError);
        }
    }, [locationError]);
    // console.log("FV: ", displayedRoutes);
    
    useEffect(() => {
        setDisplayedRoutes(displayedRoutes);
    }, [displayedRoutes, setDisplayedRoutes]);

    useEffect(() => {
        setVehicleCount(filteredVehicles.length);
    }, [filteredVehicles.length, setVehicleCount]);
    
    return (
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%'}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render route shapes from activePaths */}
        {activePaths.map(path => (
          <RouteShape 
            key={path.shape_id}
            shapeGeoJSON={path.route_line} 
            routeId={path.route_id}
            directionId={path.direction_id}
          />
        ))}
        {/* {currShape && <RouteShape shapeGeoJSON={currShape} />} */}

        {filteredVehicles.map(bus => (
          <VehicleMarker
            key={bus.vehicle_id}
            bus={bus}
          />
        ))}

        <UserLocationMarker userLocation={userLocation} />
      </MapContainer>
    );
}