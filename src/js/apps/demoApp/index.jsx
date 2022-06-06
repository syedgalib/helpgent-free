import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const elm = document.getElementById('root');
if ( elm ) {
  ReactDOM.createRoot( elm ).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}