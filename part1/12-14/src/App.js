import React from 'react'
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [largestAnegdoteId, setLargestAnegdoteId] = useState(0)
  const [points, setPoints] = useState(Array(8).fill(0))
  const setRandomAnegdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  console.log({ selected })

  const voteForAnegdote = () => {
    const copyPoints = { ...points }
    copyPoints[selected] += 1
    setPoints(copyPoints)

    let largestId = 0
    for (let i = 1; i < anecdotes.length; i++) {

      if (copyPoints[i] > copyPoints[largestId]) {
        largestId = i
      }

    }
    if (largestId !== largestAnegdoteId)
      setLargestAnegdoteId(largestId)
  }


  console.log("Points:", points)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={voteForAnegdote} >vote</button>
      <button onClick={setRandomAnegdote} >Next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[largestAnegdoteId]}</p>
    </div>
  )
}

export default App