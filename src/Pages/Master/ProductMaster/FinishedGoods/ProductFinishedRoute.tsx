
import { Route, Routes } from 'react-router-dom'
import NavigationBar from '../../../../components/NavigationBar'
import ProductRawMaterial from './ProductFinishedGoods'
import ViewProductRawMaterial from './ViewProduct/ViewProduct'
import AddProductFinishedGoods from './AddProduct/AddProduct'
import EditProductFinishedGoods from './EditProduct/EditProduct'

function ProductFinishedGoodsRoute() {
  return (
    <div className='overflow-x-hidden'>
    <NavigationBar/>
    <Routes>
      <Route path='/' index element={<ProductRawMaterial/>}/>
      <Route path='/add' element={<AddProductFinishedGoods/>}/>
      <Route path='/edit/:id' element={<EditProductFinishedGoods/>}/>
      <Route path='/view/:id' element={<ViewProductRawMaterial/>}/>
    </Routes>
    </div>
  )
}

export default ProductFinishedGoodsRoute