import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Chat from './routes/Chat'
import ChatBot from './routes/ChatBot'
import Demo from './routes/Demo'
import Main from './routes/Main'

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/demo' component={Demo} />
        <Route path='/chat' component={Chat} />
        <Route path='/chatbot' component={ChatBot} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
