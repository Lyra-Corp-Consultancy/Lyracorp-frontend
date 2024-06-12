import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductionMasterRoute from './ProductionMasterSettings/ProductionMasterRoute'

function ProductionRoute() {
  return (
    <>
    <Routes>
        <Route path='/master-settings/*' element={<ProductionMasterRoute/>}/>
    </Routes>
    </>
  )
}

export default ProductionRoute