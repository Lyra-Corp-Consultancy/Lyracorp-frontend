import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CustomerType from './CustomerType/CustomerType'
import AccountType from './AccountType/AccountType'
import PaymentType from './PaymentType/PaymentType'
import DiscountType from './DiscountType/DiscountType'
import UOMType from './UOMType/UOMType'
import TaxType from './TaxType/TaxType'
import CertificationType from './CertificationType/CertificationType'
import MarginSettingType from './MarginSettingType/MarginSettingType'
import VendorType from './VendorType/VendorType'
import DocumentType from './DocumentType/DocumentType'

function TypeMasterRoutes() {
    return (
        <>
            <Routes>
                <Route path='/customer-type' element={<CustomerType />} />
                <Route path='/account-type' element={<AccountType />} />
                <Route path='/payment-type' element={<PaymentType />} />
                <Route path='/discount-type' element={<DiscountType />} />
                <Route path='/document-type' element={<DocumentType />} />
                <Route path='/uom-type' element={<UOMType />} />
                <Route path='/tax-type' element={<TaxType />} />
                <Route path='/certification-type' element={<CertificationType />} />
                <Route path='/margin-setting-type' element={<MarginSettingType />} />
                <Route path='/vendor-type' element={<VendorType />} />
            </Routes>
        </>
    )
}

export default TypeMasterRoutes