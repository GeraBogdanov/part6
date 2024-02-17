import { createSlice, current } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes'

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

// const initialState = anecdotesAtStart.map(asObject);
const initialState = []

//CreateSlice funciton returns an object containing the reducer as well  as the action creators
//defined by the reducers parameter
// The reducer can be accessed by the noteSlice.reducer property, whereas the action
// creators by the anecdoteSlice.actions property.
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    voteAnecdote(state, action){
      const id = action.payload.id

      const votedAnecdote = action.payload
       
      console.log(JSON.parse(JSON.stringify(state)))
      
      return state.map((anecdote) => 
        anecdote.id !== id ? anecdote : votedAnecdote)
    },
    appendAnecote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, setAnecdotes, appendAnecote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecote(newAnecdote))
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    const vote = await anecdoteService.addVote(anecdote)
    dispatch(voteAnecdote(vote))
  }
}
export default anecdoteSlice.reducer