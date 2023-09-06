import { useState } from 'react'
const Statistics = ({good , bad , neutral})=>{
  return (
    <>
      <h1>Statistics</h1>
      good {good}
      <br/>
      neutral {neutral}
      <br/>
      bad {bad}
      <br/>
      <Average good={good} bad = {bad} neutral={neutral}/>
      <br/>
      <Positive good={good} bad = {bad} neutral={neutral}/>
    </>
  )
}

const Average= ({good,neutral,bad})=>{
  const average = (good-bad)/(good+neutral+bad);
  if((good+bad+neutral)>0){
    return (
      <>
      average {average}
      </>
    )
  }
  else{
    return(
      <>
      average 0
      </>
    )
  }  
}
const Positive= ({good,neutral,bad})=>{
  const average = (good)*100/(good+neutral+bad);
  if((good+bad+neutral)>0){
    return (
      <>
      positive {average}%
      </>
    )
  }
  else{
    return(
      <>
      positive 0%
      </>
    )
  }  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={()=>setGood(good+1)}>good</button>
      <button onClick={()=>setNeutral(neutral+1)}>neutral</button>
      <button onClick={()=>setBad(bad+1)}>bad</button>
      <Statistics bad={bad} good={good} neutral={neutral}/>
    </div>
  )
}

export default App