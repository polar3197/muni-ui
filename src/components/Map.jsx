// components/Map.jsx
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css';
import '../css/Map.css';

import { useFetchVehicles } from '../hooks/fetchVehicles';
import { useFetchStops } from '../hooks/fetchStops';
import { useFilterVehicles } from '../hooks/filterVehicles';
import VehicleMarker from './VehicleMarker';
import StopMarker from './StopMarker';

// Component to render the route shape
function RouteShape({ shapeGeoJSON }) {
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        if (!shapeGeoJSON) {
            setCoordinates([]);
            return;
        }

        // GeoJSON format: { "type": "LineString", "coordinates": [[lon, lat], [lon, lat], ...] }
        if (shapeGeoJSON.type === 'LineString' && shapeGeoJSON.coordinates) {
            // Convert from [lon, lat] to [lat, lon] for Leaflet
            const leafletCoords = shapeGeoJSON.coordinates.map(coord => [coord[1], coord[0]]);
            setCoordinates(leafletCoords);
        }
    }, [shapeGeoJSON]);

    if (coordinates.length === 0) return null;

    return (
        <Polyline
            positions={coordinates}
            pathOptions={{
                color: '#eb2525',
                weight: 8,
                opacity: 0.7
            }}
        />
    );
}

export default function Map({
  selectedRoutes,
  selectedNeighborhoods,
  setVehicleCount,
  setTimeUpdated,
  routeStops,
  currShape
}) {
    const sf = [37.7749, -122.447];
    const position = sf;

    const { buses } = useFetchVehicles(60000, setTimeUpdated);
    const { fetchedStops } = useFetchStops(routeStops);
    const filteredVehicles = useFilterVehicles(buses, selectedNeighborhoods, selectedRoutes);

    useEffect(() => {
        setVehicleCount(filteredVehicles.length);
    }, [filteredVehicles.length]);
    
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

        {/* Render route shape */}
        {currShape && <RouteShape shapeGeoJSON={currShape} />}

        {filteredVehicles.map(bus => (
          <VehicleMarker 
            key={bus.vehicle_id}
            bus={bus}
          />
        ))}

        {fetchedStops != 'none' && fetchedStops.map(route => 
          route.stops.map(stop => (
            <StopMarker 
              key={stop.stop_id + stop.lat}
              stop={stop}
            />
          ))
        )}
      </MapContainer>
    );
}