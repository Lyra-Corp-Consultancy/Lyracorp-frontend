import React from 'react'
import NavigationBar from '../../../components/NavigationBar'
import { Route, Routes } from 'react-router-dom'
import PurchaseOrder from './PurchaseOrder'
import AddPurchaseOrder from './AddPurchaseOrder/AddPurchaseOrder'

function PurchaseOrderRoute() {
  return (
    <div className='overflow-x-hidden'>
    <NavigationBar/>
    <Routes>
        <Route path='/' index element={<PurchaseOrder/>} />
        <Route path='/add-purchase-order'  element={<AddPurchaseOrder/>} />
    </Routes>
    </div>
  )
}

export default PurchaseOrderRoute