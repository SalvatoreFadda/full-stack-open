import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotesService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    initializeAnecdotes: (state, action) => {
      return action.payload
    },
    voteAnecdote: (state, action) => {
      const anecdote = state.find(a => a.id === action.payload)
      if (anecdote) {
        anecdote.votes += 1
      }
    },
    createAnecdote: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(anecdoteSlice.actions.initializeAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(anecdoteSlice.actions.createAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState()
    const anecdoteToVote = anecdotes.find(a => a.id === id)
    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }

    const updatedAnecdote = await anecdoteService.update(id, votedAnecdote)
    dispatch(anecdoteSlice.actions.voteAnecdote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer
