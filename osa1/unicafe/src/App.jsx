import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics =(props) => {
  const quantity = props.good + props.bad + props.neutral
  const sum = props.good - props.bad
  if (quantity > 0) {
    return (
      <table>
        <tbody>
      <StatisticLine text='good' value={props.good} />
      <StatisticLine text='neutral' value={props.neutral} />
      <StatisticLine text='bad' value={props.bad} />
      <StatisticLine text='all' value={quantity} />
      <StatisticLine text='average' value={sum / quantity} />
      <StatisticLine text='positive' value={`${props.good / quantity * 100} %`} />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      No feedback given
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1) 

  return (
    <div>
      <h3>give feedback</h3>
      <Button handleClick={addGood} text='good' />
      <Button handleClick={addNeutral} text='neutral' />
      <Button handleClick={addBad} text='bad' />
      <br></br>
      <br></br>
      <h3>statistics</h3> 
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
