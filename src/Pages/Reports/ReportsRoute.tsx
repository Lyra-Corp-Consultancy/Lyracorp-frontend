
import { Route, Routes } from 'react-router-dom'
import InventoryReportsRoute from './InventoryReport/InventoryReportsRoute'
import QualityReport from './QualityReport/QualityRoutes'
import NavigationBar from '../../components/NavigationBar'
import FgOutWardReport from './FgOutwardReport/FgOutWardReport'




function ReportsRoute() {
    return (
        <>
        <NavigationBar/>
            <Routes> 
                <Route path='/inventory-report/*' element={<InventoryReportsRoute/>}/>
                <Route path='/quality-report/*' element={<QualityReport/>}/>
                <Route path="/fg-outward-report/*" element={<FgOutWardReport/>}/>
            </Routes>
        </>
    )
}

export default ReportsRoute