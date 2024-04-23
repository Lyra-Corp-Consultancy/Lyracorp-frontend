import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CustomerMaster from './CustomerMaster'
import AddCustomer from './AddCustomer/AddCustomer'
import NavigationBar from '../../../components/NavigationBar'

function CustomerMasterRoute() {
  return (
    <div className='overflow-x-hidden'>
    <NavigationBar/>
    <Routes>
        <Route path='/' index element={<CustomerMaster/>}/>
        <Route path='/add-customer' element={<AddCustomer/>}/>
    </Routes>
    </div>
  )
}

export default CustomerMasterRoute