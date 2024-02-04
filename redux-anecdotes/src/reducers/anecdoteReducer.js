import { createSlice, current } from '@reduxjs/toolkit';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

//CreateSlice funciton returns an object containing the reducer as well  as the action creators
//defined by the reducers parameter
// The reducer can be accessed by the noteSlice.reducer property, whereas the action
// creators by the anecdoteSlice.actions property.
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    createAnecdote(state, action){
      const content = action.payload
      state.push(
        asObject(content)
      )
    },

    addVote(state, action){
      const id = action.payload
      //state.find returns the object in state if it's not the primitive 
      // the object will be reference
      const anecdoteToVote = current(state).find((anecdote) => anecdote.id === id)

      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      
      console.log(JSON.parse(JSON.stringify(state)))
      
      return state.map((anecdote) => 
        anecdote.id !== id ? anecdote : votedAnecdote)
    }
  }
})

export const { createAnecdote, addVote} = anecdoteSlice.actions
export default anecdoteSlice.reducer