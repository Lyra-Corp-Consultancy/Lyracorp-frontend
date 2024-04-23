import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import MasterRoutes from './Pages/Master/MasterRoutes'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/master/*' element={<MasterRoutes />} />
      </Routes>
    </div>
  )
}

export default App
