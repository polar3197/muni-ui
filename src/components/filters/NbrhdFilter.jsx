import { useState } from 'react'
import SelectionBubbles from './SelectionBubbles'
import '../../css/NbrhdFilter.css'

const NbrhdFilter = ({ selectedNeighborhoods, setSelectedNeighborhoods, availableNeighborhoods }) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.trim().length > 0) {
            const filtered = availableNeighborhoods.filter(nhood =>
                nhood.toLowerCase().includes(value.toLowerCase()) &&
                !selectedNeighborhoods.includes(nhood)
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (nhood) => {
        addNeighborhood(nhood);
        setInputValue('');
        setShowSuggestions(false);
    };

    const addNeighborhood = (nhood) => {
        const validNhood = availableNeighborhoods.find(n =>
            n.toLowerCase() === nhood.toLowerCase()
        );

        if (!validNhood || selectedNeighborhoods.includes(validNhood)) {
            return;
        }

        setSelectedNeighborhoods([...selectedNeighborhoods, validNhood]);
    };

    const handleSubmit = () => {
        if (!inputValue.trim()) return;
        addNeighborhood(inputValue.trim());
        setInputValue('');
        setShowSuggestions(false);
    };

    const removeNeighborhood = (nhoodToRemove) => {
        setSelectedNeighborhoods(selectedNeighborhoods.filter(n => n !== nhoodToRemove));
    };

    const handleShowAll = () => {
        setSelectedNeighborhoods([]);
        setInputValue('');
        setShowSuggestions(false);
    };

    return (
        <div className="nhood-filter">
            <div className="autocomplete-wrapper">
                <input
                    type="text" 
                    placeholder='Type to search neighborhoods...'
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
                        {suggestions.map(nhood => (
                            <li 
                                key={nhood}
                                onClick={() => handleSuggestionClick(nhood)}
                                className="suggestion-item"
                            >
                                {nhood}
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
                items={selectedNeighborhoods}
                onRemove={removeNeighborhood}
                maxHeight="150px"
            />
        </div>
    )
}

export default NbrhdFilter;