import './Start.css'

const Start = ({gameStart}) => {
  return (
    <div className='start'>
        <h1>Guess Word</h1>
        <h3>Guess the letters to win the game!</h3>
        <p>Click in the button to start the game</p>
        <button onClick={gameStart}>Play</button>
    </div>

  )
}

export default Start