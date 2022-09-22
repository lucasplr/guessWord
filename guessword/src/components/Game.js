import './Game.css'
import { useState, useRef } from 'react'

const Game = ({verifyWord, pickedWord, pickedCategory, letters, guesses, wrongLetters, guessedLetters, score}) => {

    const [letter, setLetter] = useState('')
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {

        e.preventDefault()

        verifyWord(letter)

        setLetter('')

        letterInputRef.current.focus()
    }
  return (
    <div className="game">
        <p className="points"><span>Points: {score}</span></p>

        <h1>Guess the word:</h1>

        <h3 className="tip">Word tip:<span> {pickedCategory}</span></h3>

        <p><span></span>You have {guesses} tries left</p>

        <div className="wordContainer">
            {letters.map((letter, i) => (
                guessedLetters.includes(letter) ? (
                    <span key={i} className='letter'>{letter}</span>
                ) : (
                    <span key={i} className='blankSquare'></span>
                )
            ))}
        </div>
        <div className="letterContainer">
            <p>Try to guess a letter from the word: </p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="letter" maxLength='1' required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef}/>
                <button>Guess</button>
            </form>
        </div>
        <div className="wrongLettersContainer">
            <p>Letters already guessed: </p>
            {wrongLetters.map((letter, i) => (
                <span key={i}>{letter}, </span>
            ))}
        </div>

    </div>

  )
}

export default Game