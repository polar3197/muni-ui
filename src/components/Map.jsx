// components/Map.jsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useMemo } from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/Map.css';

const destinationIcon = L.divIcon({
  className: 'destination-marker',
  html: '<div class="destination-pin"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24]
});

function FlyToDestination({ destination }) {
  const map = useMap();

  useEffect(() => {
    if (destination) {
      map.flyTo([destination.lat, destination.lon], 14);
    }
  }, [destination, map]);

  return null;
}

import { useFetchVehicles } from '../hooks/fetchVehicles';
import { useFilterVehicles } from '../hooks/filterVehicles';
import useUserLocation from '../hooks/useUserLocation';
import VehicleMarker from './VehicleMarker';
import RouteShape from './RouteShape';
import UserLocationMarker from './UserLocationMarker';

export default function Map({
  selectedRoutes,
  selectedNeighborhoods,
  showPaths,
  shapesCache,
  nearbyShapeIds,
  setVehicleCount,
  setTimeUpdated,
  destination,
}) {
  const sf = [37.7749, -122.447];
  const position = sf;
  
  const { buses } = useFetchVehicles(60000, setTimeUpdated);
  const displayedVehicles = useFilterVehicles(buses, selectedNeighborhoods, selectedRoutes, nearbyShapeIds);
  const { userLocation } = useUserLocation();

  // console.log("DISPLAYED VEHICLES: ", displayedVehicles);
  
  // Derive paths - prioritize destination-based shapes over vehicle-based
  const displayedPaths = useMemo(() => {
    if (!showPaths) return [];

    // If we have nearby shapes from destination, use those
    if (nearbyShapeIds && nearbyShapeIds.length > 0) {
      return nearbyShapeIds
        .map(id => shapesCache[id])
        .filter(Boolean);
    }

    // Otherwise fall back to vehicle-based shapes
    const shapeIds = [...new Set(displayedVehicles.map(v => v.shape_id))];
    return shapeIds
      .map(id => shapesCache[id])
      .filter(Boolean);
  }, [showPaths, nearbyShapeIds, displayedVehicles, shapesCache]);

  // console.log("DISPLAYED PATHS outer: ", displayedPaths);
  
  useEffect(() => {
    setVehicleCount(displayedVehicles.length);
  }, [displayedVehicles.length, setVehicleCount]);
  
  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FlyToDestination destination={destination} />
      
      {displayedPaths.map(shape => (
        <RouteShape 
          key={shape.shape_id}
          shapeGeoJSON={shape.shape_polyline}
          routeId={shape.route_id}
          directionId={shape.direction_id}
        />
      ))}
      
      {displayedVehicles.map(bus => (
        <VehicleMarker key={bus.vehicle_id} bus={bus} />
      ))}

      {destination && (
        <Marker position={[destination.lat, destination.lon]} icon={destinationIcon}>
          <Popup>
            <strong>{destination.name}</strong>
            <br />
            <small>
              Lat: {destination.lat.toFixed(5)}<br />
              Lon: {destination.lon.toFixed(5)}
            </small>
          </Popup>
        </Marker>
      )}

      <UserLocationMarker userLocation={userLocation} />
    </MapContainer>
  );
}