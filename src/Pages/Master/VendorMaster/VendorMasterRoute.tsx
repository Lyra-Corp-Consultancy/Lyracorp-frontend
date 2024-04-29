import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavigationBar from '../../../components/NavigationBar'
import VendorMaster from './VendorMaster'
import AddVendor from './AddVendor/AddVendor'
import ViewVendors from './ViewVendors/ViewVendors'
import EditVendors from './EditVendors/EditVendors'

function VendorMasterRoute() {
  return (
    <div className='overflow-x-hidden'>
    <NavigationBar/>
    <Routes>
        <Route path='/' index element={<VendorMaster/>} />
        <Route path='/add-vendor' index element={<AddVendor/>} />
        <Route path='/view-vendors/:id' element={<ViewVendors/>}/>
        <Route path='/edit-vendors/:id' element={<EditVendors/>}/>
    <Route path='/'/>
    </Routes>
    </div>
  )
}

export default VendorMasterRoute