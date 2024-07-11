
import NavigationBar from '../../../components/NavigationBar'
import {  Routes,Route } from 'react-router-dom'
import StockCheckList from './StockCheckList'
import AddStockCheck from './AddStockCheck/AddStockChange'
import ViewStockCheck from './ViewStockCheck/ViewStockCheck'

function StockCheckRoute() {
  return (
    <div>
    <NavigationBar />
    <Routes>
      <Route path="/" index element={<StockCheckList />} />
      <Route path="/add" element={<AddStockCheck />} />
      <Route path="/view" element={<ViewStockCheck />} />
    </Routes>
  </div>
  )
}

export default StockCheckRoute