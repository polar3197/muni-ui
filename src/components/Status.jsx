import '../css/Controls.css'
import { useState } from 'react'

// const ToggleSwitch = ({ label, leftLabel = "Control Panel", rightLabel = "LLM Interface" }) => {
//     const [isChecked, setIsChecked] = useState(false);

//     const toggleSwitch = () => {
//         setIsChecked(!isChecked);
//     };

//     return (
//         <div className="toggle-container">
//             <span className={`toggle-label ${!isChecked ? 'active' : ''}`}>
//                 {leftLabel}
//             </span>
//             <div className="toggle-switch">
//                 <input
//                     type="checkbox"
//                     className="checkbox"
//                     name={label}
//                     id={label}
//                     checked={isChecked}
//                     onChange={toggleSwitch}
//                 />
//                 <label className="label" htmlFor={label}>
//                     <span className="switch" />
//                 </label>
//             </div>
//             <span className={`toggle-label ${isChecked ? 'active' : ''}`}>
//                 {rightLabel}
//             </span>
//         </div>
//     );
// };

export default function Status({vehicleCount}) {
    return (
        <div className="status">
            <p><b>vehicle count:</b> {vehicleCount}</p>
            {/* <ToggleSwitch label="interface-toggle" />  Add label prop */}
        </div>
    );
}