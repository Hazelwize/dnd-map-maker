import {useState} from 'react'

const SetupForm = ({setGame}) => {
    const [url, setUrl] = useState('')
    const [count, setCount] = useState('')
    const [shape, setShape] = useState('square')
    const [height, setHeight] = useState('')
    const [imgPreview, setImgPreview] = useState('')

    const handleImg = (e) => {
        setUrl(e.target.value)
    }
    const handleCount = (e) => {
        setCount(e.target.value)
    }
    const handleShape = (e) => {
        shape ==='square' ? setShape('hexagon') : setShape('square')
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
        
        const board = {
            imgUrl : url,
            height: height,
            tileCount: count,
            tileShape: shape,
        }

        window.localStorage.setItem('gameBoard', JSON.stringify(board))
        setCount('')
        setShape('square')
        setUrl('')
        setGame()
    }
    
    return (
        <div className="form__container">
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <label> URL for the map image:
                    <input onBlur={()=>{getPreview(url)}}className="form__input" onChange={(e) => handleImg(e)} value={url}  name='url' placeholder="image url" required/>
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
            {imgPreview && <img onLoad={(e) => getHeight(e)} src={imgPreview} style={{width:"1200px"}}></img>}
        </div>
    )
}

export default SetupForm