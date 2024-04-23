import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TypeMasterRoutes from './TypeMaster/TypeMasterRoutes'
import CustomerMasterRoute from './CustomerMaster/CustomerMasterRoute'

function MasterRoutes() {
    return (
        <>
            <Routes>
                <Route path='/type-master/*' element={<TypeMasterRoutes/>}/>
                <Route path='/customer-master/*' element={<CustomerMasterRoute/>}/>
            </Routes>
        </>
    )
}

export default MasterRoutes