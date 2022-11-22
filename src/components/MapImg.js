import Tile from './Tile'

const MapImg = ({changeTile, height, color, tileType, tiles, mapUrl}) => {
    const mapStyles = {
        background: `url(${mapUrl}) 0 0 no-repeat`,
        backgroundSize: 'cover',
        width: '1200px',
        height: `${height}px`,
        
    }
    return(
        <div id="mapImage" className="main__container">
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