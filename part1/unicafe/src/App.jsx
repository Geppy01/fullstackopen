import { useState } from 'react'

//Component that returns current value of each states
const Statistics = (props) => {
  //If the total value equals 0 (means that we don't have any feedbacks) then
  if(props.totalValue===0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value={props.goodValue} />
        <StatisticLine text="neutral" value={props.neutralValue} />
        <StatisticLine text="bad" value={props.badValue} />
        <StatisticLine text="all" value={props.totalValue} />
        <StatisticLine text="average" value={props.averageValue} />
        <StatisticLine text="positive" value={props.positiveValue} additionalArgument='%' />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
    return(
      <tr>
        <td>{props.text}</td>
        <td>{props.value} {props.additionalArgument}</td>
      </tr>
    )
}

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  //handler function that changes the right value of states based on rightState value within the conditional statement
  const handleValueClick = (newValue, rightState) =>{
    if(rightState == "good"){
      setGood(newValue)
    }
    if(rightState == "neutral"){
      setNeutral(newValue)
    }
    if(rightState == "bad"){
      setBad(newValue)
    }

    setTotal(total+1)
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={()=>handleValueClick(good+1, "good")} text="good" />
        <Button onClick={()=>handleValueClick(neutral+1, "neutral")}  text="neutral" />
        <Button onClick={()=>handleValueClick(bad+1, "bad")}text="bad" />
      </div>
      <div>
        <h1>statistics</h1>
        <Statistics goodValue={good} neutralValue={neutral} badValue={bad} totalValue={total}
          averageValue={(good-bad)/total} positiveValue={(good/total)*100}/>
      </div>
    </div>
  )
}

export default App