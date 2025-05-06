import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Drink from './components/Drink'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path = '/drink/:id' element = { <Drink /> } />
      <Route path = '/' element = { <Home /> } />
    </Routes>
  )
}

export default App
