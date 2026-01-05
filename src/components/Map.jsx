import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css';
import '../css/Map.css';

import { useFetchVehicles } from '../hooks/fetchVehicles';
import { useFetchStops } from '../hooks/fetchStops';
import { useFilterVehicles } from '../hooks/filterVehicles';
import VehicleMarker from './VehicleMarker';
import StopMarker from './StopMarker';

export default function Map({ 
  selectedRoutes, 
  selectedNeighborhood, 
  setVehicleCount, 
  setTimeUpdated, 
  routeStops 
}) {
    const london = [51.505, -0.09];
    const sf = [37.7749, -122.447];
    const sc = [36.9741, -122.0288];

    const position = sf;

    /* ========== ROUTE FILTER LOGIC ======================== */
    // fetch new bus locations every minute
    const { buses } = useFetchVehicles(60000, setTimeUpdated);
    const { fetchedStops } = useFetchStops(routeStops);
    const filteredVehicles = useFilterVehicles(buses, selectedNeighborhood, selectedRoutes);

    // update vehicle count
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