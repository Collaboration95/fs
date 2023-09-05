import { useState } from 'react'
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
  }
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)

  return (
    <div>

      <Display counter={counter}/>
      <Button handleClick={increaseByOne} text='plus'/>
      <Button handleClick={setToZero} text='zero'/>
      
    </div>
  )
}

export default App