import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Chat from './routes/Chat'
import ChatBot from './routes/ChatBot'
import Demo from './routes/Demo'
import GPS from './routes/GPS'
import Main from './routes/Main'

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/demo' component={Demo} />
        <Route path='/chat' component={Chat} />
        <Route path='/chatbot' component={ChatBot} />
        <Route path='/gps' component={GPS} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
