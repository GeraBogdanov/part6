import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const QueryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      dispatch({ type: 'SHOW', string: `You added ${newAnecdote.content}` })
      setTimeout(() => {
        dispatch({ type: 'HIDE', string: '' })
      }, 5 * 1000)

      const anecdotes = QueryClient.getQueryData(['anecdotes'])
      QueryClient.setQueriesData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      console.log(error)
      dispatch({ type: 'SHOW', payload: error.response.data.error})
      setTimeout(() => {
        dispatch({type:'HIDE', payload: ''})
      }, 5 * 1000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
