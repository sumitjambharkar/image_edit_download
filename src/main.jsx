import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MainToggle from './MainToggle.jsx'
import ToggleButton from './ToggleButton.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <MainToggle/>
    <ToggleButton/> */}
  </React.StrictMode>,
)
