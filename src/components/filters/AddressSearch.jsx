import { useState, useEffect, useRef } from 'react';
import api from '../../api'

// San Francisco coordinates and bounding box
const SF_LAT = 37.7749;
const SF_LON = -122.4194;
const SF_BBOX = '-122.52,37.70,-122.35,37.83'; // minLon,minLat,maxLon,maxLat

export default function AddressSearch({ onDestinationSelected }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const debounceRef = useRef(null);
    const containerRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch suggestions from Photon
    const fetchSuggestions = async (searchText) => {
        if (!searchText.trim()) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://photon.komoot.io/api/?` +
                `q=${encodeURIComponent(searchText)}&` +
                `lat=${SF_LAT}&` +
                `lon=${SF_LON}&` +
                `bbox=${SF_BBOX}&` +
                `limit=5`
            );
            const data = await response.json();
            setSuggestions(data.features || []);
            setShowDropdown(data.features?.length > 0);
        } catch (error) {
            console.error('Photon geocoding error:', error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    // Debounced input handler
    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            fetchSuggestions(value);
        }, 300);
    };

    // Build display name from Photon properties
    const formatAddress = (properties) => {
        const parts = [];

        // Add place name if it exists (for POIs like restaurants, bars, etc.)
        if (properties.name) {
            parts.push(properties.name);
        }

        // Add street address
        if (properties.housenumber && properties.street) {
            parts.push(`${properties.housenumber} ${properties.street}`);
        } else if (properties.street) {
            parts.push(properties.street);
        }

        if (properties.city) parts.push(properties.city);

        return parts.join(', ') || 'Unknown location';
    };

    // Handle suggestion selection
    const handleSelect = async (feature) => {
        const [lon, lat] = feature.geometry.coordinates;
        const displayName = formatAddress(feature.properties);
        setQuery(displayName);
        setSuggestions([]);
        setShowDropdown(false);

        console.log("LON/LAT: ", lon, lat);
        const response = await api.post("/nearby-shapes", {"lon": lon, "lat": lat});
        const shapeIds = response.data || [];
        console.log("NEARBY SHAPES: ", shapeIds);

        onDestinationSelected(
            { lat, lon, name: displayName },
            shapeIds
        );
    };

    // Handle Enter key - select first suggestion or trigger search
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (suggestions.length > 0) {
                handleSelect(suggestions[0]);
            } else if (query.trim()) {
                fetchSuggestions(query);
            }
        }
    };

    return (
        <div className="address-search" ref={containerRef}>
            <div className="address-input-wrapper">
                <input
                    type="text"
                    placeholder="Enter destination..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                    autoComplete="off"
                />
                {loading && <span className="search-spinner">...</span>}
            </div>
            {showDropdown && suggestions.length > 0 && (
                <ul className="address-suggestions">
                    {suggestions.map((feature, index) => (
                        <li
                            key={feature.properties.osm_id || index}
                            onClick={() => handleSelect(feature)}
                        >
                            {formatAddress(feature.properties)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}