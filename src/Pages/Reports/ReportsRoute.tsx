
import { Route, Routes } from 'react-router-dom'
import InventoryReportsRoute from './InventoryReport/InventoryReportsRoute'
import QualityReport from './QualityReport/QualityReport'
import NavigationBar from '../../components/NavigationBar'




function ReportsRoute() {
    return (
        <>
        <NavigationBar/>
            <Routes>
              
                <Route path='/inventory-report/*' element={<InventoryReportsRoute/>}/>
                <Route path='/quality-report/' element={<QualityReport/>}/>
            </Routes>
        </>
    )
}

export default ReportsRoute