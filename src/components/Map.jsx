import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useState } from 'react'
import 'leaflet/dist/leaflet.css';
import '../css/Map.css';
import L from 'leaflet';

import { useFetchVehicles } from '../hooks/fetchVehicles';
// import { useFetchNeighborhoods } from '../hooks/fetchNeighborhoods';

export default function Map({ selectedRoutes, selectedNeighborhood, setVehicleCount }) {
    const london = [51.505, -0.09];
    const sf = [37.7749, -122.447];
    const sc = [36.9741, -122.0288];

    const position = sf;

    /* ========== ROUTE FILTER LOGIC ======================== */
    // fetch new bus locations every minute
    const { buses } = useFetchVehicles(60000);

    // filter routes
    let filteredBuses = selectedRoutes === 'all' 
      ? buses 
      : buses.filter(b =>  selectedRoutes.includes(b.route_id));
    /* ========== ROUTE FILTER LOGIC ======================== */

    /* ========== NEIGHBORHOOD FILTER LOGIC ================= */
    // currently built to only handle one neighborhood
    // const { neighborhood } = useFetchNeighborhoods(selectedNeighborhood);

    // filter neighborhoods
    filteredBuses = selectedNeighborhood === 'all'
      ? filteredBuses
      : filteredBuses.filter(b => selectedNeighborhood.includes(b.neighborhood));

    /* ========== NEIGHBORHOOD FILTER LOGIC ================= */

    // update vehicle count
    setVehicleCount(filteredBuses.length)

    // define vehicle marker appearance
    const colors = {
        0: "lightblue",
        1: "lightgreen",
        2: "yellow",
        3: "lightcoral"
    };
    const vehicleIcon = (routeID, occupancy) => L.divIcon({
        className: 'vehicle-label',
        html: `<div class="vehicle-icon" style="background-color:${colors[occupancy]};">${routeID}</div>`,
        iconSize: null
    });


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
        {filteredBuses.map(bus => (
          
          <Marker 
            key={bus.vehicle_id} 
            position={[bus.lat, bus.lon]}
            icon={vehicleIcon(bus.route_id, bus.occupancy)}
          >
            <Popup>{bus.route_id}</Popup>
          </Marker>
        ))}
      </MapContainer>
    );
}