import Tile from './Tile'

const MapImg = ({tiles, changeTile, tileWidth, height, color, tileType, mapUrl}) => {
    const mapStyles = {
        background: `url(${mapUrl}) 0 0 no-repeat`,
        backgroundSize: 'cover',
        width: '1200px',
        height: `${height}px`,
        
    }
    console.log(tileWidth)
    return(
        <div className="main__container" style={{'--s':`${tileWidth}px`}}>
            <div className="map__container" style={mapStyles}>
                {tiles.map((e,i) => {
                    if(e === true){
                        return <Tile className={tileType} changeTile={changeTile} key={i} index={i} color={color}/>
                    }else{
                        return <Tile className={tileType} changeTile={changeTile} key={i} index={i} color="transparent"/>
                    }
                })}

            </div>
        </div>
    )
}



export default MapImg