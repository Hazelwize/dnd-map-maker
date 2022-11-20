import {useState} from 'react'
import SetupForm from './components/SetupForm'
import './App.css';

function App() {
  const [tiles,setTiles] = useState(() => JSON.parse(window.localStorage.getItem('gameBoard')), [])
  
  const getTiles = () =>{
    setTiles(JSON.parse(window.localStorage.getItem('gameBoard')))
  }
  return(
    <div>
      {!tiles  && <SetupForm setTiles={getTiles} />}

    </div>

  )
}

export default App;
