import { useState, useEffect } from 'react'
import './App.css'
import './css/Map.css'
import './css/Controls.css'

import Map from './components/Map';
import Controls from './components/Controls';
import Status from './components/Status';
import api from './api'
import useDisplayPaths from './hooks/displayPaths';

function App() {
  // [] = show all, ['N', etc.] = show specified, null = show none
  const [selectedRoutes, setSelectedRoutes] = useState(['J', 'N', '38R']);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState([]);
  const [displayedRoutes, setDisplayedRoutes] = useState(['J', 'N', '38R']);

  const [vehicleCount, setVehicleCount] = useState('');
  const [timeUpdated, setTimeUpdated] = useState('loading...');

  const [pathButton, setPathButton] = useState('Show Paths');

  // immediately fetch known route IDs and Nhoods for quick validation
  const [availableRoutes, setAvailableRoutes] = useState([]);
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState([]);

  // Fetch and cache on mount
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [routesData, nhoodsData] = await Promise.all([
          api.get("/routes"),
          api.get("/neighborhoods"),
        ]);
        
        setAvailableRoutes(routesData.data);
        setAvailableNeighborhoods(nhoodsData.data);
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
      }
    };

    fetchMetadata();
  }, []);

  const activePaths = useDisplayPaths(pathButton, displayedRoutes)


  return (
    <div className='site-wrapper'>
      <div className='header'><h2>MUNI Map</h2></div>
      <div className='page-content'>
        <div className='map-container'>
            <Map
              selectedRoutes={selectedRoutes}
              selectedNeighborhoods={selectedNeighborhoods}
              setVehicleCount={setVehicleCount}
              setTimeUpdated={setTimeUpdated}
              activePaths={activePaths}
              setDisplayedRoutes={setDisplayedRoutes}
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
              selectedNeighborhoods={selectedNeighborhoods}
              setSelectedNeighborhoods={setSelectedNeighborhoods}
              availableRoutes={availableRoutes}
              availableNeighborhoods={availableNeighborhoods}
              setPathButton={setPathButton}
              pathButton={pathButton}
            />
        </div>
      </div>
    </div>
  );
}

export default App;
