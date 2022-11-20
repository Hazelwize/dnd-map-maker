import Tile from './Tile'

const MapImg = ({changeTile, color, tileType, tiles, mapUrl}) => {
    const mapStyles = {
        background: `url(${mapUrl}) 0 0 no-repeat`,
        backgroundSize: 'contain',
        height: '1000px',
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