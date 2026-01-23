import { useState, useEffect } from 'react'
import './App.css'
import './css/Map.css'
import './css/Controls.css'

import Map from './components/Map';
import Controls from './components/Controls';
import Status from './components/Status';
import api from './api'

function App() {
  const [selectedRoutes, setSelectedRoutes] = useState(['J', 'N', '38R']);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState([]);
  const [showPaths, setShowPaths] = useState(false); // boolean, not string
  const [nearbyShapeIds, setNearbyShapeIds] = useState([]); // shape_ids from destination search

  const [vehicleCount, setVehicleCount] = useState(0);
  const [timeUpdated, setTimeUpdated] = useState('loading...');
  const [destination, setDestination] = useState(null);
  
  // Metadata - fetch once
  const [availableRoutes, setAvailableRoutes] = useState([]);
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState([]);
  const [shapesCache, setShapesCache] = useState({}); // shape_id -> shape data

  

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [routes, nhoods, shapes] = await Promise.all([
          api.get("/routes"),
          api.get("/neighborhoods"),
          api.get("/paths")
        ]);
        
        setAvailableRoutes(routes.data);
        setAvailableNeighborhoods(nhoods.data);

        // Index shapes AND parse GeoJSON strings
        const indexed = shapes.data.reduce((acc, shape) => {
          acc[shape.shape_id] = {
            ...shape,
            shape_polyline: typeof shape.shape_polyline === 'string' 
              ? JSON.parse(shape.shape_polyline)
              : shape.shape_polyline
          };
          return acc;
        }, {});
        
        setShapesCache(indexed);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMetadata();
  }, []);

  const handleDestinationSelected = (dest, shapeIds = []) => {
      setDestination(dest);
      setNearbyShapeIds(shapeIds);
      setShowPaths(true); // Auto-show paths when destination selected
      console.log('Finding routes to:', dest, 'Nearby shapes:', shapeIds);
  };

  const handleHidePaths = () => {
      setShowPaths(false);
      setNearbyShapeIds([]); // Clear destination-based paths
  };

  // console.log("SHAPES CACHE: ", shapesCache);

  return (
    <div className='site-wrapper'>
      <div className='header'><h2>MUNI Map</h2></div>
      <div className='page-content'>
        <div className='map-container'>
          <Map
            selectedRoutes={selectedRoutes}
            selectedNeighborhoods={selectedNeighborhoods}
            showPaths={showPaths}
            shapesCache={shapesCache}
            nearbyShapeIds={nearbyShapeIds}
            setVehicleCount={setVehicleCount}
            setTimeUpdated={setTimeUpdated}
            destination={destination}
          />
        </div>
        <div className='sidebar'>
          <Status vehicleCount={vehicleCount} timeUpdated={timeUpdated} />
          <Controls
            selectedRoutes={selectedRoutes}
            setSelectedRoutes={setSelectedRoutes}
            selectedNeighborhoods={selectedNeighborhoods}
            setSelectedNeighborhoods={setSelectedNeighborhoods}
            availableRoutes={availableRoutes}
            availableNeighborhoods={availableNeighborhoods}
            showPaths={showPaths}
            onHidePaths={handleHidePaths}
            onDestinationSelected={handleDestinationSelected}
          />
        </div>
      </div>
    </div>
  );
}

// function App() {
//   // [] = show all, ['N', etc.] = show specified, null = show none
//   const [selectedRoutes, setSelectedRoutes] = useState(['J', 'N', '38R']);
//   const [selectedNeighborhoods, setSelectedNeighborhoods] = useState([]);
//   const [displayedRoutes, setDisplayedRoutes] = useState(['J', 'N', '38R']);

//   const [vehicleCount, setVehicleCount] = useState('');
//   const [timeUpdated, setTimeUpdated] = useState('loading...');

//   const [pathButton, setPathButton] = useState('Show Paths');

//   // immediately fetch known route IDs and Nhoods for quick validation
//   const [availableRoutes, setAvailableRoutes] = useState([]);
//   const [availableNeighborhoods, setAvailableNeighborhoods] = useState([]);
//   const [availabePaths, setAvailablePaths] = useState([]);

//   // Fetch and cache on mount
//   useEffect(() => {
//     const fetchMetadata = async () => {
//       try {
//         const [routesData, nhoodsData, pathsData] = await Promise.all([
//           api.get("/routes"),
//           api.get("/neighborhoods"),
//           api.get("/paths")
//         ]);
        
//         setAvailableRoutes(routesData.data);
//         setAvailableNeighborhoods(nhoodsData.data);
//         setAvailablePaths(pathsData.data);

//       } catch (error) {
//         console.error("Failed to fetch routes and neighborhoods metadata:", error);
//       }
//     };

//     fetchMetadata();
//   }, []);

//   const activePaths = useDisplayPaths(pathButton, displayedVehicles, availabePaths)


//   return (
//     <div className='site-wrapper'>
//       <div className='header'><h2>MUNI Map</h2></div>
//       <div className='page-content'>
//         <div className='map-container'>
//             <Map
//               selectedRoutes={selectedRoutes}
//               selectedNeighborhoods={selectedNeighborhoods}
//               setVehicleCount={setVehicleCount}
//               setTimeUpdated={setTimeUpdated}
//               activePaths={activePaths}
//               setDisplayedRoutes={setDisplayedRoutes}
//             />
//         </div>
//         <div className='sidebar'>
//             <Status
//               vehicleCount={vehicleCount}
//               timeUpdated={timeUpdated}
//             />
//             <Controls
//               selectedRoutes={selectedRoutes}
//               setSelectedRoutes={setSelectedRoutes}
//               selectedNeighborhoods={selectedNeighborhoods}
//               setSelectedNeighborhoods={setSelectedNeighborhoods}
//               availableRoutes={availableRoutes}
//               availableNeighborhoods={availableNeighborhoods}
//               setPathButton={setPathButton}
//               pathButton={pathButton}
//             />
//         </div>
//       </div>
//     </div>
//   );
// }

export default App;
