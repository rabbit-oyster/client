import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Chat from './routes/Chat'
import ChatBot from './routes/ChatBot'
import Demo from './routes/Demo'
import GPS from './routes/GPS'
import Main from './routes/Main'
import NotFound from './routes/NotFound'

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/demo' component={Demo} />
        <Route path='/chat' component={Chat} />
        <Route path='/chatbot' component={ChatBot} />
        <Route path='/gps' component={GPS} />
        <NotFound />
      </Switch>
    </BrowserRouter>
  )
}

export default App
