import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {TransationProvider} from './contex/TransactionsContex';

ReactDOM.render(
  <TransationProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TransationProvider>,
  document.getElementById('root')
)
