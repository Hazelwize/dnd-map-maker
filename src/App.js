import {useState, useEffect} from 'react'
import SetupForm from './components/SetupForm'
import MapImg from './components/MapImg'
import './App.css';

function App() {
  const [gameBoard, setGameBoard] = useState(() => JSON.parse(window.localStorage.getItem('gameBoard')), '')
  // //gameBoard: {
  //   imgUrl: ,
  //   height: ,
  //   tileCount:,
  //   tileShape:,
  // }
  const [tiles, setTiles] = useState(() => JSON.parse(window.localStorage.getItem('tiles')), [])
  const [tileWidth, setTileWidth] = useState();
  
  //Set width and height in tiles for total tile count
  // tile width= 1200/tileCount
  // tile height = tileWidth * .89425
  // img height / height = total tiles high
  // tilesHigh * tilesWide = total tiles

  function getTotalTiles(tilesWide){
    const wide = Number(tilesWide);
    const pixWide = 1200/wide
    const pixHeight = pixWide * .89425
    const tilesHigh = gameBoard.height / pixHeight
    const total = Math.ceil(tilesHigh * wide)
    const result = (total - (total % (wide * 2 - 1 )) + wide)
    return result
  }

  
  
  useEffect(() => {
    if(!tiles && gameBoard){
      const totalTiles = getTotalTiles(gameBoard.tileCount)
      const arr = Array.from({length:totalTiles}).fill(true)
      setTiles(arr)
      setTileWidth((1200/gameBoard.tileCount).toFixed(4))
    }else{
      setTileWidth((1200/gameBoard.tileCount).toFixed(4))
    }
  },[gameBoard])

  useEffect(() => {
    window.localStorage.setItem('tiles', JSON.stringify(tiles))
  },[tiles])
  
  const handleTileClick = (key) => {
    const arr = tiles.map((e,i) => i === key ? !e : e)
    setTiles(arr)
  }

  const getGame = () =>{
    setGameBoard(JSON.parse(window.localStorage.getItem('gameBoard')))
  }

  return(
    <div>
      {!gameBoard  && <SetupForm setGame={getGame} />}
      {tiles && gameBoard && <MapImg 
                        changeTile={handleTileClick}
                        height={gameBoard.height} 
                        tileType={gameBoard.tileShape}
                        tileWidth={tileWidth} 
                        tiles={tiles} 
                        mapUrl={gameBoard.imgUrl}
                    />}


    </div>

  )
}

export default App;
