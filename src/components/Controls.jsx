import '../css/Controls.css'
import NbrhdFilter from './filters/NbrhdFilter'
import StopsControl from './filters/StopsControl'
import RouteFilter from './filters/RouteFilter'
import ShapeFilter from './filters/ShapeFilter'

const Pane = ({ name, filter }) => {
    return (
        <div className='control'>
            <h3>{name}</h3>
            {filter}
        </div>
    )
}

export default function Controls({
    selectedRoutes,
    setSelectedRoutes,
    selectedNeighborhoods,
    setSelectedNeighborhoods,
    setRouteStops,
    availableRoutes,
    availableNeighborhoods,
    currShape,
    setCurrShape,
}) {
    return (
        <div className="controls-container">
            <Pane
                name='Route Filter'
                filter={
                    <RouteFilter
                        selectedRoutes={selectedRoutes}
                        setSelectedRoutes={setSelectedRoutes}
                        availableRoutes={availableRoutes}
                    />
                }
            />
            <Pane
                name='Neighborhood Filter'
                filter={
                    <NbrhdFilter
                        selectedNeighborhoods={selectedNeighborhoods}
                        setSelectedNeighborhoods={setSelectedNeighborhoods}
                        availableNeighborhoods={availableNeighborhoods}
                    />
                }
            />
            <Pane 
                name='Show Stops' 
                filter={
                    <StopsControl
                        setRouteStops={setRouteStops}
                    />
                }
            />
            <Pane 
                name='Show Shapes' 
                filter={
                    <ShapeFilter 
                        setCurrShape={setCurrShape}
                    />
                }
            />
            <Pane name='*In development*' />
        </div>
    );
}