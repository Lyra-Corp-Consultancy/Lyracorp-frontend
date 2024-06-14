import NavigationBar from '../../../components/NavigationBar'
import { Route, Routes } from 'react-router-dom'
import ProductionMaster from './ProductionMaster'
import SOPSettings from './SOPSettings/SOPSettings'

function ProductionMasterRoute() {
  return (
     <div className="overflow-x-hidden">
      <NavigationBar />
      <Routes>
        <Route path="/" index element={<ProductionMaster />} />
        <Route path="/new/:id" element={<SOPSettings />} />
      </Routes>
    </div>
  )
}

export default ProductionMasterRoute