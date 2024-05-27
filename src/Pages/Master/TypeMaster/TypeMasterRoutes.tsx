
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
import DepartmentType from './DepartmentType/DepartmentType'
import RoleType from './RoleType/RoleType'
import PackingType from './PackingType/PackingType'
import ShippingType from './ShippingType/ShippingType'

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
                <Route path='/department-type' element={<DepartmentType />} />
                <Route path='/role-type' element={<RoleType />} />
                <Route path='/packing-type' element={<PackingType />} />
                <Route path='/shipping-type' element={<ShippingType />} />
            </Routes>
        </>
    )
}

export default TypeMasterRoutes