import '../css/Controls.css'
import NbrhdFilter from './filters/NbrhdFilter'
import RouteFilter from './filters/RouteFilter'
import DisplayPaths from './filters/DisplayPaths'

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
    availableRoutes,
    availableNeighborhoods,
    setPathButton,
    pathButton,
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
                name='Show Paths' 
                filter={
                    <DisplayPaths 
                        setPathButton={setPathButton}
                        pathButton={pathButton}
                    />
                }
            />
            <Pane name='*In development*' />
            <Pane name='*In development*' />
        </div>
    );
}