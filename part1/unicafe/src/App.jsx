import { useState } from 'react'

//Component that returns current value of each states
const DisplayFeedbacks = (props) => (
  <>
    <p>good {props.goodValue}</p>
    <p>neutral {props.neutralValue}</p>
    <p>bad {props.badValue}</p>
  </>
)

const FeedbackButton = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <FeedbackButton onClick={()=>handleValueClick(good+1, "good")} text="good" />
        <FeedbackButton onClick={()=>handleValueClick(neutral+1, "neutral")}  text="neutral" />
        <FeedbackButton onClick={()=>handleValueClick(bad+1, "bad")}text="bad" />
      </div>
      <div>
        <h1>statistics</h1>
        <DisplayFeedbacks goodValue={good} neutralValue={neutral} badValue={bad}/>
      </div>
    </div>
  )
}

export default App