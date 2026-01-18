

const PathFilter = () => {
    const paths = ({ setPaths }) => {
        const [inputValue, setInputValue] = useState('');
    
        const handleSubmit = async () => {
            // add route entry validation
            const paths = inputValue.split(',').map(r => r.trim().toLowerCase()).filter(r => r);
            setPaths(paths);
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
    
}

export default PathFilter;