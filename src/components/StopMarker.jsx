
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';




export default function StopeMarker({stop}) {
    const stopIcon = () => L.divIcon({
        className: 'stop-label',
        html: `<div class="stop-icon"></div>`,
        iconSize: null
    });

    return (
        <Marker
            key={stop.stop_id}
            position={[stop.lat, stop.lon]}
            icon={stopIcon()}
        >
            <Popup>{stop.name}</Popup>
        </Marker>
    )
}


