import React from 'react'
import NavigationBar from '../../../components/NavigationBar'
import { Route, Routes } from 'react-router-dom'
import PurchaseOrder from './PurchaseOrder'
import AddPurchaseOrder from './AddPurchaseOrder/AddPurchaseOrder'
import ViewPurchaseOrder from './ViewPurchaseOrder/ViewPurchaseOrder'

function PurchaseOrderRoute() {
  return (
    <div className='overflow-x-hidden'>
    <NavigationBar/>
    <Routes>
        <Route path='/' index element={<PurchaseOrder/>} />
        <Route path='/add-purchase-order'  element={<AddPurchaseOrder/>} />
        <Route path='/view-purchase-order/:id'  element={<ViewPurchaseOrder/>} />
    </Routes>
    </div>
  )
}

export default PurchaseOrderRoute