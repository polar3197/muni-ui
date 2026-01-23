// components/DisplayPaths.jsx
export const DisplayPaths = ({ showPaths, onHidePaths }) => {
    if (!showPaths) {
        return (
            <div className="interactives">
                <span className="paths-hint">Select a destination to show nearby paths</span>
            </div>
        );
    }

    return (
        <div className="interactives">
            <button onClick={onHidePaths}>
                Hide Paths
            </button>
        </div>
    );
};

export default DisplayPaths;