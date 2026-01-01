import '../css/Controls.css'
import { useState } from 'react'
// import { useFetchNeighborhoods } from '../hooks/fetchNeighborhoods';

const RouteFilter = ({ selectedRoutes, setSelectedRoutes }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        // Parse comma-separated routes: "N, J, 38R" -> ['N', 'J', '38R']
        const routes = inputValue.split(',').map(r => r.trim().toUpperCase()).filter(r => r);
        setSelectedRoutes(routes);
        setInputValue('');
    };

    const handleShowAll = () => {
        setSelectedRoutes('all');
    };

    return (
        <div className="interactives">
            <input
                type="text" 
                placeholder='N, J, 38R, ...'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}>
            </input>
            <button onClick={handleSubmit}>submit</button>
            <button onClick={handleShowAll}>show all</button>
        </div>
    )
}

const NbrhdFilter = ({ setSelectedNeighborhood }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        const nbrhd = inputValue.split(',').map(r => r.trim().toLowerCase()).filter(r => r);
        setSelectedNeighborhood(nbrhd);
        setInputValue('');
    };

    const handleShowAll = () => {
        setSelectedNeighborhood('all');
    };

    return (
        <div className="interactives">
            <div className="interactives">
            <input
                type="text" 
                placeholder='Nob Hill, Inner Richmond...'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}>
            </input>
            <button onClick={handleSubmit}>submit</button>
            <button onClick={handleShowAll}>show all</button>
        </div>
        </div>
    )
}

const Pane = ({ name, filter }) => {
    return (
        <div className='control'>
            <h3>{name}</h3>
            {filter}
        </div>
    )
}

export default function Controls({ selectedRoutes, setSelectedRoutes, setSelectedNeighborhood }) {
    return (
        <div className="controls-container">
            <Pane name='Route Filter' filter={
                <RouteFilter 
                    selectedRoutes={selectedRoutes} 
                    setSelectedRoutes={setSelectedRoutes}
                />
            }/>
            <Pane name='Neighborhood Filter' filter={
                <NbrhdFilter 
                    setSelectedNeighborhood={setSelectedNeighborhood}
                />
            }/>
            <Pane name='One NBRHD to Another'/>
        </div>
    );
}