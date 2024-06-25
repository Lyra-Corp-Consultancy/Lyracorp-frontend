
import { Route, Routes } from 'react-router-dom'
import ProductRawMaterialRoute from './RawMaterial/ProductRawMaterialRoute'
import ProductFinishedGoodsRoute from './FinishedGoods/ProductFinishedRoute'
import ProductMapping from './ProductMapping/ProductMapping'

function ProductMasterRoute() {
  return (
    <div className='overflow-x-hidden'>
    <Routes>
      <Route path='/raw-material/*' index element={<ProductRawMaterialRoute/>}/>
      <Route path='/finished-goods/*' index element={<ProductFinishedGoodsRoute/>}/>
      <Route path='/product-mapping' index element={<ProductMapping/>}/>
    </Routes>
    </div>
  )
}

export default ProductMasterRoute