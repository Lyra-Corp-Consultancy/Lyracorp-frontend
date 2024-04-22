import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import CustomerType from './Pages/Master/TypeMaster/CustomerType/CustomerType'
import AccountType from './Pages/Master/TypeMaster/AccountType/AccountType'
import PaymentType from './Pages/Master/TypeMaster/PaymentType/PaymentType'
import DiscountType from './Pages/Master/TypeMaster/DiscountType/DiscountType'
import DocumentType from './Pages/Master/TypeMaster/DocumentType/DocumentType'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/master/type-master/customer-type' element={<CustomerType />} />
        <Route path='/master/type-master/account-type' element={<AccountType />} />
        <Route path='/master/type-master/payment-type' element={<PaymentType />} />
        <Route path='/master/type-master/discount-type' element={<DiscountType />} />
        <Route path='/master/type-master/document-type' element={<DocumentType />} />
      </Routes>
    </div>
  )
}

export default App
