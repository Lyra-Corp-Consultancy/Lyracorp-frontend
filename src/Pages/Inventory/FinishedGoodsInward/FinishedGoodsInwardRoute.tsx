import NavigationBar from '../../../components/NavigationBar'
import { Route, Routes } from 'react-router-dom'
import FinishedGoodsInwards from './FinishedGoodsInwards'
import AddFinishedGoods from './AddFinishedGoods/AddFinishedGoods'
import EditFinishedGoods from './EditFinishedGoods/EditFinishedGoods'
import ViewFinishedGoods from './ViewFinishedGoods/ViewFinishedGoods'

function FinishedGoodsInwardRoute() {
  return (
    <div className='overflow-x-hidden'>
      <NavigationBar/>
      <Routes>
        <Route path='/' index element={<FinishedGoodsInwards/>}/>
        <Route path='/add' index element={<AddFinishedGoods/>}/>
        <Route path='/edit/:id' index element={<EditFinishedGoods/>}/>
        <Route path='/view/:id' index element={<ViewFinishedGoods/>}/>
      </Routes>
    </div>
  )
}

export default FinishedGoodsInwardRoute