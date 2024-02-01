import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

/*
//First idea for doing last exercise but i ended up changing it because we didn't see the useEffect method yet.

const DisplayMostVotedAnecdote = (props) =>{
  let voteValuesCopy = [...props.valuesVote]
  let anecdoteValuesCopy = [...props.valuesAnecdote]
  let largest = props.valueMostVotedAnecdote
  console.log(largest)
  let indexBiggestAnecdoteVote = 0
  for(let i=0; i<voteValuesCopy.length; i++){
    if(voteValuesCopy[i]>largest){
      largest = voteValuesCopy[i]
      console.log(largest)
      indexBiggestAnecdoteVote = i
      console.log(indexBiggestAnecdoteVote)
    }
  }
  props.setValueMostVotedAnecdote(largest)
  return(
    <>
      <p>
      {anecdoteValuesCopy[indexBiggestAnecdoteVote]}<br/>
      has {largest} votes
      </p>
    </>
  )
}
*/

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  //Defining and initializing an array with the same length of anecdotes but filling it with all the values set to 0
  const [anecdotesVotes, setAnecdotesVotes] = useState(Array(anecdotes.length).fill(0))
  /*Array of 2 that containts the value of biggest vote in index 0 and  the value of the index that equals to the
    most voted anectode in index 1*/
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState(Array(2).fill(0))

  const handleRandomClick = () =>{
    let randomValue = Math.floor(Math.random() * 8)
    setSelected(randomValue)
  }

  const handleVoteClick = () =>{
    let updatedVoteValues = [...anecdotesVotes]
    updatedVoteValues[selected] +=1
    setAnecdotesVotes(updatedVoteValues)
    updateMostVotedAnecdote(updatedVoteValues)
  }

  const updateMostVotedAnecdote = (props) =>{
    let voteValuesCopy = [...props]
    let largestAndIndex = [...mostVotedAnecdote]

    //for every item in voteValueCopy (the array that contains the copy of votes)
    for(let i=0; i<voteValuesCopy.length; i++){
      //if the updated vote in index i is greater than the vote in the biggest actual vote
      if(voteValuesCopy[i]>largestAndIndex[0]){
        //then copy in that position the value of vote (we have a new biggest vote)
        largestAndIndex[0] = voteValuesCopy[i]
        //and copy in the next position the index that equals to the most voted anectode       
        largestAndIndex[1] = i
      }
    }
    /*after cycling the entire array of votes we'll find out what is the most voted anectode and how many votes it has.
      So we are updating MostVotedAnectode with the array that contains the number of votes in the first place and the index of the
      anectode that has those votes in the second place*/
    setMostVotedAnecdote(largestAndIndex)
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {anecdotesVotes[selected]} votes</p>
      <Button onClick={handleRandomClick} text="next anecdote" />
      <Button onClick={handleVoteClick} text="vote" />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotedAnecdote[1]]}
      <p>has {mostVotedAnecdote[0]} votes</p>
    </div>
  )
}

export default App
