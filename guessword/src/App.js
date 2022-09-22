
import './App.css';
import {useState, useEffect, useCallback} from 'react'
import Start from './components/Start';
import End from './components/End';
import Game from './components/Game';
import { wordsList } from './data/words';


const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

const qtd = 3

function App() {


  const [gameStage, setGameStage] = useState(stages[0].name)

  console.log(gameStage)

  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)



  const pickCategoryAndWord = useCallback(() => {
    const categories = Object.keys(words) //extrais as keys do objeto
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    let wordLetters = word.split('')

    wordLetters = wordLetters.map((l) => l.toLowerCase())

    return {word, category, wordLetters}
  }, [words])
  pickCategoryAndWord()

  const gameStart = useCallback(() => {

    clearLetters()

    const {word, category, wordLetters} = pickCategoryAndWord()



    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)


    setGameStage(stages[1].name)
  }, [pickCategoryAndWord])

  const verifyWord = (letter) => {

    const normalized = letter.toLowerCase()

    //check if the letter has been already utilized
    if(guessedLetters.includes(normalized) || wrongLetters.includes(normalized)){
      return
    }

    if(letters.includes(normalized)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalized
      ])
    }else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalized
      ])
      setGuesses((actualGuesses) => actualGuesses - 1)
    }

  }

  const clearLetters = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => { //useEffect monitora para reagir conforme necessário

    if(guesses <= 0){
      clearLetters()
      setGameStage(stages[2].name)
    }
  }, [guesses])


  useEffect(() => {

    const uniqueLetters = [...new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => actualScore += 100)

      gameStart()
    }


  }, [guessedLetters, letters, gameStart])

  const retry = () => {
    setScore(0)
    setGuesses(qtd)

    setGameStage(stages[0].name)
  }

  console.log(gameStage)

  return (
    <div className="App">
        {gameStage === 'start' && <Start gameStart={gameStart}/>}
        {gameStage === 'game' && <Game verifyWord={verifyWord} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guesses={guesses} wrongLetters={wrongLetters} guessedLetters={guessedLetters} score={score}/>}
        {gameStage === 'end' && <End retry={retry} score={score}/>}
    </div>
  );
}

export default App;
