
const End = ({retry, score}) => {
  return (
    <div>
        <h1>End</h1>
        <p>Você fez {score} pontos!</p>
        <button onClick={retry}></button>
    </div>
  )
}

export default End