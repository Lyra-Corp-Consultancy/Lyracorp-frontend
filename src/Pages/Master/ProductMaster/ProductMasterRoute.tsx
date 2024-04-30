import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavigationBar from '../../../components/NavigationBar'
import ProductMaster from './ProductMaster'
import AddProduct from './AddProduct/AddProduct'
import ViewProduct from './ViewProduct/ViewProduct'
import EditProduct from './EditProduct/EditProduct'

function ProductMasterRoute() {
  return (
    <div className='overflow-x-hidden'>
    <NavigationBar/>
    <Routes>
      <Route path='/' index element={<ProductMaster/>}/>
      <Route path='/add-product' element={<AddProduct/>}/>
      <Route path='/view-products/:id' element={<ViewProduct/>}/>
      <Route path='/edit-products/:id' element={<EditProduct/>}/>
    </Routes>
    </div>
  )
}

export default ProductMasterRoute