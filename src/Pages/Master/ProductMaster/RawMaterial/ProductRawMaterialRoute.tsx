
import { Route, Routes } from 'react-router-dom'
import NavigationBar from '../../../../components/NavigationBar'
import ProductRawMaterial from './ProductRawMaterial'
import AddProductRawMaterial from './AddProduct/AddProduct'
import EditProductRawMaterial from './EditProduct/EditProduct'
import ViewProductRawMaterial from './ViewProduct/ViewProduct'

function ProductRawMaterialRoute() {
  return (
    <div className='overflow-x-hidden'>
    <NavigationBar/>
    <Routes>
      <Route path='/' index element={<ProductRawMaterial/>}/>
      <Route path='/add' element={<AddProductRawMaterial/>}/>
      <Route path='/edit/:id' element={<EditProductRawMaterial/>}/>
      <Route path='/view/:id' element={<ViewProductRawMaterial/>}/>
    </Routes>
    </div>
  )
}

export default ProductRawMaterialRoute