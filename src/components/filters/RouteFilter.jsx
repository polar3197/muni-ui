import { useState } from 'react'
import SelectionBubbles from './SelectionBubbles'
import '../../css/RouteFilter.css'

const RouteFilter = ({ selectedRoutes, setSelectedRoutes, availableRoutes }) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value.toUpperCase();
        setInputValue(value);
        
        if (value.trim().length > 0) {
            const filtered = availableRoutes.filter(route => 
                route.toUpperCase().includes(value) &&
                !selectedRoutes.includes(route)
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const addRoute = (route) => {
        if (!availableRoutes.includes(route)) {
            alert(`"${route}" is not a valid route`);
            return;
        }

        if (selectedRoutes.includes(route)) {
            return;
        }

        const newSelected = [...selectedRoutes, route];
        setSelectedRoutes(newSelected);
    };

    const handleSuggestionClick = (route) => {
        addRoute(route);
        setInputValue('');
        setShowSuggestions(false);
    };

    const handleSubmit = () => {
        if (!inputValue.trim()) return;
        addRoute(inputValue.trim());
        setInputValue('');
        setShowSuggestions(false);
    };

    const removeRoute = (routeToRemove) => {
        const newSelected = selectedRoutes.filter(r => r !== routeToRemove);
        setSelectedRoutes(newSelected);
    };

    const handleShowAll = () => {
        setSelectedRoutes([]);
        setInputValue('');
        setShowSuggestions(false);
    };

    return (
        <div className="route-filter">
            <div className="autocomplete-wrapper">
                <input
                    type="text" 
                    placeholder='Type route (e.g., J, N, 38R)...'
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmit();
                        } else if (e.key === 'Escape') {
                            setShowSuggestions(false);
                        }
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="suggestions-dropdown">
                        {suggestions.map(route => (
                            <li 
                                key={route}
                                onClick={() => handleSuggestionClick(route)}
                                className="suggestion-item"
                            >
                                {route}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
            <div className="button-group">
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={handleShowAll}>Show All</button>
            </div>

            <SelectionBubbles 
                items={selectedRoutes}
                onRemove={removeRoute}
                maxHeight="120px"
            />
        </div>
    )
}

export default RouteFilter;