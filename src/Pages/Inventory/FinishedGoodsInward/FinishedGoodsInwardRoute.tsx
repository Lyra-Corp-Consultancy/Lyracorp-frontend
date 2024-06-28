import NavigationBar from '../../../components/NavigationBar'
import { Route, Routes } from 'react-router-dom'
import FinishedGoodsInwards from './FinishedGoodsInwards'
import AddFinishedGoods from './AddFinishedGoods/AddFinishedGoods'

function FinishedGoodsInwardRoute() {
  return (
    <div className='overflow-x-hidden'>
      <NavigationBar/>
      <Routes>
        <Route path='/' index element={<FinishedGoodsInwards/>}/>
        <Route path='/add' index element={<AddFinishedGoods/>}/>
      </Routes>
    </div>
  )
}

export default FinishedGoodsInwardRoute