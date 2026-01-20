import { useState } from 'react'
import api from '../../api'

export const DisplayPaths = ({ pathButton, setPathButton }) => {
    return (
        <div className="interactives">
            <button onClick={
                pathButton === 'Show Paths' 
                    ? () => setPathButton('Hide Paths')
                    : () => setPathButton('Show Paths')}
            >{pathButton}</button>
        </div>
    )
}

export default DisplayPaths;