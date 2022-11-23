const Tile = ({changeTile, color, index}) => {

    return(
        <div 
            onClick={() => changeTile(index)}
            style={{backgroundColor: color}} className="hexagon">
        </div>
    )
}

export default Tile