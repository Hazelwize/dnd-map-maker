import {useState} from 'react'

const SquareTile = ({changeTile, color, key}) => {

    return(
        <div 
            onClick={() => changeTile(key)}
            style={{backgroundColor: color}}className="hexagon">
        </div>
    )
}

export default SquareTile