import {useState, useEffect} from 'react'
import SetupForm from './components/SetupForm'
import MapImg from './components/MapImg'
import './App.css';

function App() {
  const [gameBoard,setGameBoard] = useState(() => JSON.parse(window.localStorage.getItem('gameBoard')), '')
  // //gameBoard: {
  //   imgUrl: ,
  //   tileCount:,
  //   tileShape:,
  // }
  
  const [tiles, setTiles] = useState(() => JSON.parse(window.localStorage.getItem('tiles')), [])

  useEffect(() => {
    if(!tiles && gameBoard){
      let arr = Array.from({length:gameBoard.tileCount*20}).fill(true)
      setTiles(arr)
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
                        tileType={gameBoard.tileShape} 
                        tiles={tiles} 
                        mapUrl={gameBoard.imgUrl}
                    />}


    </div>

  )
}

export default App;
