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
  const getTotalSquareTiles = (tilesWide) =>{
    const wide = Number(tilesWide);
    const tilesHigh = gameBoard.height / (1200/wide)
    const total = Math.ceil(tilesHigh * wide)
    const result = (total - (total % wide) + wide)
    return result
  }

  const getTotalHexTiles = (tilesWide) => {
    const wide = Number(tilesWide);
    const total = Math.ceil(wide * (gameBoard.height/(1200/wide * .89425)))
    const result = (total - (total % (wide * 2 - 1 )) + wide)
    return result
  }
  function getTotalTiles(tilesWide, tileType){
    if(tileType === 'square'){
      return getTotalSquareTiles(tilesWide)
    }else{
      return getTotalHexTiles(tilesWide)
    }
  }
  
  useEffect(() => {
    if(!tiles && gameBoard){
      const totalTiles = getTotalTiles(gameBoard.tileCount, gameBoard.tileShape)
      const arr = Array.from({length:totalTiles}).fill(true)
      setTiles(arr)
      setTileWidth((1200/gameBoard.tileCount).toFixed(4))
    }else if(gameBoard){
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
  const handleReset = () => {
    const arr = tiles.map(e => e = true)
    setTiles(arr)
  }
  const deleteGameBoard = () => {
    
    window.localStorage.clear()
    setTiles(() => JSON.parse(window.localStorage.getItem('tiles')), [])
    setGameBoard(() => JSON.parse(window.localStorage.getItem('gameBoard')), '')
    
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

      {tiles && gameBoard && <button onClick={() => handleReset()}>Reset Board</button>}
      {tiles && gameBoard && <button onClick={() => deleteGameBoard()}>Delete Game Board</button>}

    </div>

  )
}

export default App;
