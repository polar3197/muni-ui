import { useEffect, useState } from 'react';
import { Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-polylinedecorator';

const ROUTE_COLORS = {
    // Metro lines (bright, distinct colors)
    'J': '#ff8922',
    'K': '#c809cf',
    'L': '#e173ff',
    'M': '#6bd761',
    'N': '#7166e3',
    'T': '#7fe4f5',
    'F': '#ffec19',
    
    // Rapid routes (darker, bolder)
    '5R': '#ff1919',
    '9R': '#ff1919',
    '14R': '#ff1919',
    '28R': '#ff1919',
    '38R': '#ff1919',
    
    // Express routes (X suffix)
    '1X': '#ff19ba',
    '8AX': '#ff19ba',
    '8BX': '#ff19ba',
    '30X': '#ff19ba',
    
    // Regular numbered routes (1-99)
    '1': '#ffd919',
    '2': '#19ff4f',
    '5': '#19ff4f',
    '6': '#19ff4f',
    '7': '#19ff4f',
    '8': '#33a4e1',
    '9': '#8b53d0',
    '12': '#ff194b',
    '14': '#196dff',
    '15': '#19ff4f',
    '18': '#19ff4f',
    '22': '#30721a',
    '24': '#19ff4f',
    '27': '#d21395',
    '29': '#19ff4f',
    '30': '#19ff4f',
    '31': '#195eff',
    '33': '#fe1093',
    '35': '#19ff4f',
    '36': '#19ff4f',
    '37': '#19ff4f',
    '38': '#195eff',
    '43': '#19ff4f',
    '44': '#e149df',
    '45': '#19ff4f',
    '48': '#09a06e',
    '49': '#ffab19',
    '52': '#19ff4f',
    '54': '#19ff4f',
    '55': '#5d2f9d',
    '56': '#19ff4f',
    '57': '#19ff4f',
    '58': '#19ff4f',
    '66': '#19ff4f',
    '67': '#063062',
    '90': '#19ff4f',
    '91': '#19ff4f',
    
    // Special routes
    'CA': '#19ff4f',
    'PH': '#19ff4f',
    'PM': '#19ff4f',
    '714': '#19ff4f',
    
    // Owl routes (darker, night colors)
    'LOWL': '#19ff4f',
    'NOWL': '#19ff4f',
    'TBUS': '#19ff4f',
    'NBUS': '#19ff4f',
    'FBUS': '#19ff4f',
};

const getRouteColor = (routeId) => {
    return ROUTE_COLORS[routeId] || '#' + Math.floor(Math.random()*16777215).toString(16);
};

// Component to render the route shape
const RouteShape = ({ shapeGeoJSON, routeId, directionId }) => {
    const [coordinates, setCoordinates] = useState([]);
    const [polyline, setPolyline] = useState(null);

    useEffect(() => {
        if (!shapeGeoJSON) {
            setCoordinates([]);
            return;
        }

        if (shapeGeoJSON.type === 'LineString' && shapeGeoJSON.coordinates) {
            const leafletCoords = shapeGeoJSON.coordinates.map(coord => [coord[1], coord[0]]);
            setCoordinates(leafletCoords);
        }
    }, [shapeGeoJSON]);

    if (coordinates.length === 0) return null;

    const color = getRouteColor(routeId);
    const directionLabel = directionId === 0 ? 'Outbound' : 'Inbound';

    return (
        <Polyline
            ref={setPolyline}
            positions={coordinates}
            pathOptions={{
                color: color,
                weight: 8,
                opacity: 0.7
            }}
        >
            <Tooltip sticky direction="top">
                {routeId}
            </Tooltip>
        </Polyline>
    );
}

export default RouteShape;