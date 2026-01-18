import { useState } from 'react'


const StopsControl = ({ setRouteStops }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async () => {
        // add route entry validation
        const routes = inputValue.split(',').map(r => r.trim().toLowerCase()).filter(r => r);
        setRouteStops(routes);
    };

    const handleShowNone = () => {
        setRouteStops('none');
        setInputValue('');
    };

    return (
        <div className="interactives">
            <input
                type="text" 
                placeholder='N, J, 38R, ...'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button onClick={handleSubmit}>submit</button>
            <button onClick={handleShowNone}>hide stops</button>
        </div>
    )
}

export default StopsControl;