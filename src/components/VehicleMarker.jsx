import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export default function VehicleMarker({bus}) {
    const colors = {
        0: "lightblue",
        1: "lightgreen",
        2: "yellow",
        3: "lightcoral"
    };

    const vehicleIcon = (routeID, direction, occupancy) => L.divIcon({
        className: 'vehicle-label',
        html: `<div class="vehicle-icon" style="background-color:${colors[occupancy]};">${routeID}</div>`,
        iconSize: null
    });

    const bearing = bus.bearing || 0;

    return (
        <Marker 
            key={bus.vehicle_id} 
            position={[bus.lat, bus.lon]}
            icon={vehicleIcon(bus.route_id, bus.direction_id, bus.occupancy)}
        >
            <Popup>
                <div style={{textAlign: 'center'}}>
                    Vehicle: {bus.vehicle_id}<br/>
                    {bus.direction_id ? "Inbound" : "Outbound"}<br/>
                </div>
            </Popup>
        </Marker>
    )
}