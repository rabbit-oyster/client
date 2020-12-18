import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Demo from './routes/Demo'
import Main from './routes/Main'

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Main} />
        <Route path='/demo' component={Demo} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
