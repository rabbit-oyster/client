/* eslint-disable no-useless-escape */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './Root.css'
import './devices.css'
import 'semantic-ui-css/semantic.min.css'
console.log(
  '%cFOREST OF THE MIND',
  'color:green; font-size:100px; background:transparent'
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
