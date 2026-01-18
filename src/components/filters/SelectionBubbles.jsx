import '../../css/SelectionBubbles.css'

const SelectionBubbles = ({ 
    items, 
    onRemove, 
    maxHeight = '150px',
    emptyMessage = 'No items selected'
}) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="selection-bubbles-container">
            <div className="selection-bubbles-list" style={{ maxHeight }}>
                {items.map(item => (
                    <div key={item} className="selection-bubble">
                        <span className="bubble-text">{item}</span>
                        <button 
                            className="bubble-remove-btn"
                            onClick={() => onRemove(item)}
                            aria-label={`Remove ${item}`}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectionBubbles;