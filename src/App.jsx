import { useState } from 'react'
import './App.css'
import './css/Map.css'
import './css/Controls.css'

import Map from './components/Map';
import Controls from './components/Controls';
import Status from './components/Status';

function App() {
  // default to just three routes for rendering speed purposes
  const [selectedRoutes, setSelectedRoutes] = useState(['J', 'N', '38R']); 
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');
  const [vehicleCount, setVehicleCount] = useState('');
  const [timeUpdated, setTimeUpdated] = useState('loading...');
  const [routeStops, setRouteStops] = useState('none');

  // immediately fetch known route IDs for quick validation
  // useEffect(() => {
  //     const routes = api.get("/routes");
  // }, []);

  return (
    <div className='site-wrapper'>
      <div className='header'><h2>MUNI Map</h2></div>
      <div className='page-content'>
        <div className='map-container'>
            <Map 
              selectedRoutes={selectedRoutes} 
              selectedNeighborhood={selectedNeighborhood}
              setVehicleCount={setVehicleCount}
              setTimeUpdated={setTimeUpdated}
              routeStops={routeStops}
            />
        </div>
        <div className='sidebar'>
            <Status
              vehicleCount={vehicleCount}
              timeUpdated={timeUpdated}
            />
            <Controls 
              selectedRoutes={selectedRoutes} 
              setSelectedRoutes={setSelectedRoutes}
              setSelectedNeighborhood={setSelectedNeighborhood}
              setRouteStops={setRouteStops}
            />
        </div>
      </div>
    </div>
  );
}

export default App;
