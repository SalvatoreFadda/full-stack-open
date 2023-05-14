import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const dispatchGood = () => {
    store.dispatch({ type: 'GOOD' })
  }

  const dispatchOk = () => {
    store.dispatch({ type: 'OK' })
  }

  const dispatchBad = () => {
    store.dispatch({ type: 'BAD' })
  }

  const dispatchZero = () => {
    store.dispatch({ type: 'ZERO' })
  }

  return (
    <div>
      <button onClick={dispatchGood}>good</button> 
      <button onClick={dispatchOk}>ok</button> 
      <button onClick={dispatchBad}>bad</button>
      <button onClick={dispatchZero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
