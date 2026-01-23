import '../css/Controls.css'
import NbrhdFilter from './filters/NbrhdFilter'
import RouteFilter from './filters/RouteFilter'
import DisplayPaths from './filters/DisplayPaths'
import AddressSearch from './filters/AddressSearch'

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
    showPaths,
    onHidePaths,
    onDestinationSelected
}) {
    return (
        <div className="controls-container">
            <Pane
                name='Enter a Destination'
                filter={
                    <AddressSearch 
                        onDestinationSelected={onDestinationSelected}
                    />
                }
            />
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
                name='Paths'
                filter={
                    <DisplayPaths
                        showPaths={showPaths}
                        onHidePaths={onHidePaths}
                    />
                }
            />
            <Pane name='*In development*' />
        </div>
    );
}