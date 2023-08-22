import React from 'react'
import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  if (good === 0 && neutral === 0 && bad === 0) {
    return (<div><p>No feedback given</p></div>)
  }
  else {
    return (
      <div>
        <table>
          <tbody>

            <StatisticLine text="good" value={good} />

            <StatisticLine text="neutral" value={neutral} />

            <StatisticLine text="bad" value={bad} />

            <StatisticLine text="all" value={good + bad + neutral} />

            <StatisticLine text="average" value={(good - bad) / (good + bad + neutral)} />

            <StatisticLine text="positive[%]" value={good * 100 / (good + bad + neutral)} />

          </tbody>
        </table>
      </div>
    )
  }
}



const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App;
