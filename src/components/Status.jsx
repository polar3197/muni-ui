import '../css/Controls.css'
import { useState, useEffect } from 'react'

export default function Status({vehicleCount, timeUpdated}) {
    const [seconds, setSeconds] = useState(0)
    
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setSeconds(prev => prev + 1);
    //     }, 1000);

    //     return() => clearInterval(interval);
    // }, []);
    
    return (
        <div className="status">
            <div style={{ textAlign: "center" }}>
                <h3>{vehicleCount}</h3>
                <p>vehicles</p>
            </div>
            <div style={{ textAlign: "center" }}>
                <h3>{timeUpdated}</h3>
                <p>last updated</p>
            </div>
        </div>
    );
}