import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import CustomerType from './Pages/Master/TypeMaster/CustomerType/CustomerType'
import AccountType from './Pages/Master/TypeMaster/AccountType/AccountType'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/master/type-master/customer-type' element={<CustomerType />} />
        <Route path='/master/type-master/account-type' element={<AccountType />} />

      </Routes>
    </div>
  )
}

export default App
