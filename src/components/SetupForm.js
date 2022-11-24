import {useState, useEffect} from 'react'

const SetupForm = ({addNewGame, addNewTiles, setGame}) => {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [count, setCount] = useState('')
    const [shape, setShape] = useState('square')
    const [height, setHeight] = useState('')
    const [imgPreview, setImgPreview] = useState('')

    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleImg = (e) => {
        setUrl(e.target.value)
    }
    const handleCount = (e) => {
        setCount(e.target.value)
    }
    
    const getPreview = (url)=> {
        setImgPreview(url)
    }
    const getHeight = (e) => {
        console.log(e.target.height)
        setHeight((e.target.height).toFixed(4))
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const id = String(Math.ceil(Math.random() * 999999))
        const game = {
            gameId : id,
            tiles: []
        }
        const board = {
            id: id,
            gameName: name,
            imgUrl : url,
            height: height,
            tileCount: count,
            tileShape: shape,
        }
        addNewTiles(game)
        addNewGame(board)

        // window.localStorage.setItem('gameBoard', JSON.stringify(board))
        setCount('')
        setShape('square')
        setUrl('')
        setImgPreview('')
        setHeight('')
        setName('')
        // setGame()
    }
    
    return (
        <div className="form__container">
            <label> Campaign Name:
                    <input className="form__input" onChange={(e) => handleName(e)} value={name}  name='name' placeholder="Campaign Name" required/>
                </label>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <label> URL for the map image:
                    <input onBlur={()=>{getPreview(url)}}className="form__input" onChange={(e) => handleImg(e)} value={url}  name='url' placeholder="image url" required/>
                </label>
                <label> How many tiles wide?
                    <input className="form__input" onChange={(e) => handleCount(e)} value={count}name='tile-number' placeholder="Number of tiles" required/>
                </label>
                <label className="form__container--radio"> Tile Shape:
                    <label>Hexagon 
                        <input className="form__radio" onClick={(e) => setShape('hexagon')} type="radio" name="tile-shape" value="hexagon"/>
                    </label>
                    <label>Square 
                        <input className="form__radio" onClick={(e) => setShape('square')} type="radio" name="tile-shape" value="square" defaultChecked/>
                    </label>
                </label>
                <button className="form__button" type='submit'>Make My Map!</button>
            </form>
            {imgPreview && <img onLoad={(e) => getHeight(e)} src={imgPreview} style={{width:"1200px"}}></img>}
        </div>
    )
}

export default SetupForm