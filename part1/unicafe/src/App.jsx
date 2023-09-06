import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


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
// export default App
const App = () => {
  const [clicks, setclicks] = useState({left:0, right:0})

  const handleLeftClick = () => {
    const newclicks = {
      left: clicks.left + 1,
      right: clicks.right
    }
    console.log(newclicks);
    setclicks(newclicks)
  }

  const handleRightClick = () => {
    const newclicks = {
      left: clicks.left,
      right: clicks.right + 1
    }
    setclicks(newclicks)
  }
  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
} 
export default App