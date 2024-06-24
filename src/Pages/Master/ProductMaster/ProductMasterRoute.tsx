
import { Route, Routes } from 'react-router-dom'
import ProductRawMaterialRoute from './RawMaterial/ProductRawMaterialRoute'
import ProductFinishedGoodsRoute from './FinishedGoods/ProductFinishedRoute'

function ProductMasterRoute() {
  return (
    <div className='overflow-x-hidden'>
    <Routes>
      <Route path='/raw-material/*' index element={<ProductRawMaterialRoute/>}/>
      <Route path='/finished-goods/*' index element={<ProductFinishedGoodsRoute/>}/>
    </Routes>
    </div>
  )
}

export default ProductMasterRoute