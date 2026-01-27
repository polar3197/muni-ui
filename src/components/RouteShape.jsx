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
    '1': '#E8B339',      // Golden yellow
    '2': '#E85D75',      // Coral pink
    '5': '#4ECDC4',      // Turquoise
    '6': '#2E86AB',      // Deep blue
    '7': '#e966ac',      // Plum
    '8': '#33A4E1',      // Sky blue (keeping original)
    '9': '#8B53D0',      // Purple (keeping original)
    '12': '#FF194B',     // Red (keeping original)
    '14': '#3772FF',     // Bright blue
    '15': '#70C1B3',     // Seafoam
    '18': '#43AA8B',     // Teal
    '22': '#5F8D4E',     // Olive green
    '24': '#118AB2',     // Ocean blue
    '27': '#D21395',     // Magenta (keeping original)
    '29': '#E07A5F',     // Terracotta
    '30': '#81B29A',     // Sage green
    '31': '#195EFF',     // Royal blue (keeping original)
    '33': '#FE1093',     // Hot pink (keeping original)
    '35': '#F2CC8F',     // Peach
    '36': '#C9ADA7',     // Dusty rose
    '37': '#6A994E',     // Grass green
    '38': '#195EFF',     // Royal blue (keeping original)
    '43': '#f27f0c',     // Sand
    '44': '#E149DF',     // Violet (keeping original)
    '45': '#52B788',     // Kelly green
    '48': '#09A06E',     // Emerald (keeping original)
    '49': '#FFAB19',     // Orange (keeping original)
    '52': '#95B8D1',     // Powder blue
    '54': '#6D597A',     // Mauve
    '55': '#5D2F9D',     // Deep purple (keeping original)
    '56': '#B56576',     // Rose
    '57': '#588157',     // Forest green
    '58': '#E5989B',     // Blush pink
    '66': '#83C5BE',     // Aqua
    '67': '#063062',     // Navy (keeping original)
    '90': '#BC6C25',     // Burnt orange
    '91': '#7B68EE',     // Medium slate blue

    // Special routes
    'CA': '#DD6E42',     // Clay orange
    'PH': '#6C88C4',     // Periwinkle
    'PM': '#C77DFF',     // Lavender
    '714': '#2A9D8F',    // Jade

    // Owl routes (deeper, muted colors for night service)
    'LOWL': '#5E548E',   // Deep purple
    'NOWL': '#2C5F77',   // Midnight blue
    'TBUS': '#495867',   // Charcoal blue
    'NBUS': '#6B4E71',   // Dark plum
    'FBUS': '#3D5A80',   // Steel blue
}

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