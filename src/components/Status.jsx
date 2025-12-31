import '../css/Controls.css'

export default function Status({vehicleCount}) {
    return (
        <div className="status">
            <p>vehicle count: {vehicleCount}</p>
            <p>route count</p>
        </div>
    );
}