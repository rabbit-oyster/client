import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Main from './routes/Main'

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
