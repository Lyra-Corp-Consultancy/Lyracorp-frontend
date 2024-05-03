import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TypeMasterRoutes from './TypeMaster/TypeMasterRoutes'
import CustomerMasterRoute from './CustomerMaster/CustomerMasterRoute'
import VendorMasterRoute from './VendorMaster/VendorMasterRoute'
import ProductMasterRoute from './ProductMaster/ProductMasterRoute'
import ProfileMasterRoute from './ProfileMaster/ProfileMasterRoute'

function MasterRoutes() {
    return (
        <>
            <Routes>
                <Route path='/type-master/*' element={<TypeMasterRoutes/>}/>
                <Route path='/customer-master/*' element={<CustomerMasterRoute/>}/>
                <Route path='/vendor-master/*' element={<VendorMasterRoute/>}/>
                <Route path='/product-master/*' element={<ProductMasterRoute/>}/>
                <Route path='/profile-master/*' element={<ProfileMasterRoute/>}/>
            </Routes>
        </>
    )
}

export default MasterRoutes