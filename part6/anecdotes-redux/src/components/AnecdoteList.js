import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
      if (filter === '') return anecdotes
      const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
    })
  
    const vote = (id) => {
      console.log('Vote', id)
      dispatch(voteAnecdote(id))
      // Dispatch a notification for the voted anecdote
      dispatch(showNotification(`you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`, 5))
    }
  
    return (
      <div>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }
  
  export default AnecdoteList