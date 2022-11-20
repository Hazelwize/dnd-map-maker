import {useState} from 'react'

const SetupForm = ({setTiles}) => {
    const [url, setUrl] = useState('')
    const [count, setCount] = useState('')
    const [shape, setShape] = useState('square')
    
    const handleImg = (e) => {
        setUrl(e.target.value)
    }
    const handleCount = (e) => {
        setCount(e.target.value)
    }
    const handleShape = (e) => {
        shape ==='square' ? setShape('hexagon') : setShape('square')
    }
    const handleSubmit = (e) =>{
        e.preventDefault()       
        const board = {
            imgUrl : url,
            tileCount: count,
            tileShape: shape,
        }
        window.localStorage.setItem('gameBoard', JSON.stringify(board))
        setCount('')
        setShape('square')
        setUrl('')
        setTiles()
    }
    
    return (
        <div className="form__container">
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <label> URL for the map image:
                    <input className="form__input" onChange={(e) => handleImg(e)} value={url}  name='url' placeholder="image url" required/>
                </label>
                <label> How many tiles wide?
                    <input className="form__input" onChange={(e) => handleCount(e)} value={count}name='tile-number' placeholder="Number of tiles" required/>
                </label>
                <label className="form__container--radio"> Tile Shape:
                    <label>Hexagon 
                        <input className="form__radio" onChange={(e) => handleShape(e)} type="radio" name="tile-shape" value="hexagon"/>
                    </label>
                    <label>Square 
                        <input className="form__radio" onChange={(e) => handleShape(e)} type="radio" name="tile-shape" value="square" checked/>
                    </label>
                </label>
                <button className="form__button" type='submit'>Make My Map!</button>
            </form>
        </div>
    )
}

export default SetupForm