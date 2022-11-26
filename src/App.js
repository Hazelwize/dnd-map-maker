import {useState, useEffect} from 'react'
import SetupForm from './components/SetupForm'
import MapImg from './components/MapImg'
import GameSelect from './components/GameSelect'
import './App.css';

function App() {
  const [games, setGames] = useState(() => JSON.parse(window.localStorage.getItem('games'), []))
  const [gameBoard, setGameBoard] = useState('')
  const [id, setId] = useState('')
  const [newMap, setNewMap] = useState(true)
  const [gameSelect, setGameSelect] = useState(true)
  //gameboard: {
  //   id: id,
  //   gameName: name,
  //   imgUrl : url,
  //   height: height,
  //   tileCount: count,
  //   tileShape: shape,
  // }
  const [tiles, setTiles] = useState([])
  
  const [tileWidth, setTileWidth] = useState(0);
  
  //Set width and height in tiles for total tile count
  // tile width= 1200/tileCount
  // tile height = tileWidth * .89425
  // img height / height = total tiles high
  // tilesHigh * tilesWide = total tiles
  function addTiles(tiles){
    window.localStorage.setItem(tiles.gameId, JSON.stringify([]))
  }

  function loadGame(index){
    if(id !== games[index].id){
      setTileWidth(0)
      setId(games[index].id)
      setTiles(() => window.localStorage.getItem(`${games[index].id}`))
      setGameBoard(games[index])
    }
    console.log(games[index].id)
    
  }
  useEffect(() => {
    if(id){
      const game = games.find(e => e.id === id)
      setGameBoard(game)
      setTiles(JSON.parse(window.localStorage.getItem(id)))
    }
  },[id])

  function addGame(game){
    if(games){
      setGames([...games, game])
    }else{
      setGames([game])
    }
    
  }
  useEffect(()=> {
    window.localStorage.setItem('games', JSON.stringify(games))
  },[games])

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
    if(tiles.length === 0 && gameBoard){
      console.log(gameBoard)
      const totalTiles = getTotalTiles(gameBoard.tileCount, gameBoard.tileShape)
      const arr = Array.from({length:totalTiles}).fill(true)
      setTiles(arr)
      setTileWidth((1200/gameBoard.tileCount).toFixed(4))
    }else if(gameBoard){
      setTileWidth((1200/gameBoard.tileCount).toFixed(4))
    }
    console.log(tileWidth)
    console.log(tiles)
  },[gameBoard,tiles,tileWidth])

  useEffect(() => {
    if(gameBoard.id){
      window.localStorage.setItem(gameBoard.id , JSON.stringify(tiles))
    }
  },[tiles])

  console.log(gameBoard.id, tiles)
  
  const handleTileClick = (key) => {
    const arr = tiles.map((e,i) => i === key ? !e : e)
    setTiles(arr)
  }

  // const getGame = () =>{
  //   setGameBoard(JSON.parse(window.localStorage.getItem('gameBoard')))
  // }
  const handleReset = () => {
    const arr = tiles.map(e => e = true)
    setTiles(arr)
  }
  const deleteGameBoard = () => {
    
    const newGames = games.filter(e => e.id !== gameBoard.id)
    setGames(newGames)
    window.localStorage.removeItem(gameBoard.id)
    setGameBoard('')    
  }
  return(
    <div>
      <nav className="nav">
        <button className="form__button" onClick={()=>setNewMap(!newMap)}>{newMap? "Close Map Maker": "Make New Map"}</button>
        <button className="form__button" onClick={()=>setGameSelect(!gameSelect)}>{gameSelect? "Hide Campaign Maps": "Show Campaign Maps"}</button>
      </nav>
      {newMap  && <SetupForm addNewGame={addGame} addNewTiles={addTiles}  />}
      {games&& gameSelect && <GameSelect selectGame={loadGame} items={games} />}
      {tiles.length > 10 && tileWidth && gameBoard && <MapImg 
                        changeTile={handleTileClick}
                        height={gameBoard.height} 
                        tileType={gameBoard.tileShape}
                        tileWidth={tileWidth} 
                        tiles={tiles} 
                        mapUrl={gameBoard.imgUrl}
                    />}
      {tiles && gameBoard && <nav className="nav nav--bottom">
        <button className="form__button" onClick={() => handleReset()}>Reset Board</button>
        <button className="form__button" onClick={() => deleteGameBoard()}>Delete Game Board</button>
      </nav>}
      

    </div>

  )
}

export default App;
