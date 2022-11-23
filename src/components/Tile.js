const Tile = ({className, changeTile, color, index}) => {

    return(
        <div 
            onClick={() => changeTile(index)}
            style={{backgroundColor: color}} className={className}>

        </div>
    )
}

export default Tile