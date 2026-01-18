import { useState } from 'react'
import api from '../../api'

export const ShapeFilter = ({ setCurrShape }) => {
    const [shapes, setShapes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async () => {
        try {
            // fetches list of (shape_id, shape_geometry)
            const response = await api.get(`/shapes/${inputValue}`);
            const selectedShapes = response.data;
            
            console.log('Fetched shapes:', selectedShapes); // Debug
            
            if (selectedShapes.length === 0) {
                alert(`No shapes found for route ${inputValue}`);
                return;
            }

            // Set the first shape as current
            setCurrShape(selectedShapes[0][1]);
            setShapes(selectedShapes);
            setCurrentIndex(0);
            
        } catch (error) {
            console.error('Error fetching shapes:', error);
            alert('Failed to fetch shapes');
        }
    }

    const nextShape = () => {
        if (shapes.length === 0) return;

        // Move to next shape (wrap around to start)
        const nextIndex = (currentIndex + 1) % shapes.length;
        setCurrentIndex(nextIndex);
        setCurrShape(shapes[nextIndex][1]);
    }

    // Get current shape ID safely
    const currentShapeId = shapes.length > 0 && shapes[currentIndex] 
        ? shapes[currentIndex][0] 
        : '';

    return (
        <div className="interactives">
            <input
                type="text" 
                placeholder=''
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                style={{fontSize: '18px', width: '60px'}}
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={nextShape} disabled={shapes.length === 0}>
                Next ({currentShapeId || 'None'}) {shapes.length}
            </button>
        </div>
    )
}

export default ShapeFilter;