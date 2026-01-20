import { Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

const createUserIcon = (heading) => {
    // Default to 0 (north) if no heading available (e.g., on desktop)
    const displayHeading = (heading !== null && !isNaN(heading)) ? heading : 0;

    return L.divIcon({
        className: 'user-location',
        html: `<div class="user-location-wrapper">
                   <div class="user-location-arrow" style="transform: rotate(${displayHeading}deg);"></div>
                   <div class="user-location-marker"></div>
               </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });
};

export default function UserLocationMarker({ userLocation }) {
    if (!userLocation) return null;

    const userIcon = createUserIcon(userLocation.heading);

    return (
        <>
            <Circle
                center={[userLocation.lat, userLocation.lng]}
                radius={userLocation.accuracy}
                pathOptions={{
                    color: '#4285f4',
                    fillColor: '#4285f4',
                    fillOpacity: 0.15,
                    weight: 1
                }}
            />
            <Marker
                position={[userLocation.lat, userLocation.lng]}
                icon={userIcon}
            >
                <Popup>
                    <div style={{ textAlign: 'center' }}>
                        Your location<br />
                        Accuracy: ~{Math.round(userLocation.accuracy)}m
                    </div>
                </Popup>
            </Marker>
        </>
    );
}
