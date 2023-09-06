import { useState } from 'react'

const Statistics = ({good , bad , neutral})=>{

  if((good+bad+neutral)>0){
  return (
    <>
      <h1>Statistics</h1>
      <table>
      <StatisticsLine text="good" value={good}/>
      <StatisticsLine text="neutral" value={neutral}/>
      <StatisticsLine text="bad" value={bad}/>
      <Average good={good} bad = {bad} neutral={neutral}/>
      <Positive good={good} bad = {bad} neutral={neutral}/>
      </table>
    </>
  )
  }
  else{
    return <h3>No feedback given</h3>
  }
}
const StatisticsLine=({text,value})=>{

  return (
    <tr>
    <td>{text}</td>
    <td> {value}</td>
    </tr>
  )
}

const Average= ({good,neutral,bad})=>{
  const average = (good-bad)/(good+neutral+bad);
  if((good+bad+neutral)>0){
    return (
      <tr>
      <td>average</td><td> {average}</td>
      </tr>
    )
  }
  else{
    return(
      <tr>
      <td>average</td><td> 0</td>
      </tr>
    )
  }  
}
const Positive= ({good,neutral,bad})=>{
  const average = (good)*100/(good+neutral+bad);
  if((good+bad+neutral)>0){
    return (
      <tr>
        <td>positive</td>
        <td> {average}%</td>
      </tr>
    )
  }
  else{
    return(
      <tr>
      <td>positive</td>
      <td>0%</td>
    </tr>
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