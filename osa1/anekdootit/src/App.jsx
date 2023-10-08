import { useState } from 'react'

const Anecdotes = ({anecdotes, voteTable, selected}) => {
  return (
  <div>
    <h3>Anecdote of the day</h3>
    <p>{anecdotes[selected]}</p>
    <p>has {voteTable[selected]} votes</p>
  </div>
  )
}

const MostPopular = ({ voteTable, anecdotes, popular }) => {
  if (Math.max(...voteTable)> 0)
    return (
      <div>
        <h3>Anecdote with most votes</h3>
        <p>{anecdotes[popular]} </p>
        <p>has {voteTable[popular]} votes</p>
        </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const maara = anecdotes.length 
  
  const taulukko = Array(maara).fill(0)

  const [selected, setSelected] = useState(Math.floor(Math.random() * maara))
  const [voteTable, setVote] = useState(taulukko)
  const [popular, setPopular] = useState(0)
  
  const randomAnecdote = () => {
    const index = Math.floor(Math.random() * maara)
    setSelected(index)
  }

  const voteAnecdote =() => {
    const voteTableCopy =[...voteTable]
    voteTableCopy[selected] += 1
    setVote(voteTableCopy)
    const most = Math.max(...voteTableCopy)
    const index = voteTableCopy.indexOf(most)
    setPopular(index)
    
  }
  
  return (
    <div>
      <Anecdotes anecdotes={anecdotes} selected={selected} voteTable={voteTable} />
      <button onClick={voteAnecdote} >vote</button>
      <button onClick={randomAnecdote}> next anecdote </button>
      <MostPopular voteTable={voteTable} anecdotes={anecdotes} popular={popular}  />
    </div> 
  )
}

export default App