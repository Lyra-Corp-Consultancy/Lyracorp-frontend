import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CustomerMaster from './CustomerMaster'
import AddCustomer from './AddCustomer/AddCustomer'
import NavigationBar from '../../../components/NavigationBar'
import ViewCustomer from './ViewCustomers/ViewCustomer'
import EditCustomer from './EditCustomer/EditCustomer'

function CustomerMasterRoute() {
  return (
    <div className='overflow-x-hidden'>
    <NavigationBar/>
    <Routes>
        <Route path='/' index element={<CustomerMaster/>}/>
        <Route path='/add-customer' element={<AddCustomer/>}/>
        <Route path='/view-customers/:id' element={<ViewCustomer/>}/>
        <Route path='/edit-customers/:id' element={<EditCustomer/>}/>
    </Routes>
    </div>
  )
}

export default CustomerMasterRoute