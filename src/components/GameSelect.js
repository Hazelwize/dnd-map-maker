const GameSelect = ({selectGame, items}) => {
    return (
        <div className='game-select'>
            {items.map((e,i) => {
                return(
                    <div style={{backgroundImage:`url(${e.imgUrl})`}} className='game-select__game' onClick={() => selectGame(i)} key={i}>
                        <h2>{e.gameName}</h2>
                    </div>
                )
            })}
        </div>
    )
}

export default GameSelect