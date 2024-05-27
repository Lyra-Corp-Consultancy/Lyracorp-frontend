import { Route, Routes } from "react-router-dom";
import PurchaseInward from "./PurchaseInward";
import NavigationBar from "../../../components/NavigationBar";
import AddPurchaseInward from "./AddPurchaseInward/AddPurchaseInward";
import ViewPurchaseInward from "./ViewPurchaseInward/ViewPurchaseInward";
import EditPurchaseInward from "./EditPurchaseInward/EditPurchaseInward";

function PurchaseInwardRoute() {
  return (
    <div className='overflow-x-hidden'>
    <NavigationBar/>
    <Routes>
      <Route index path="/" element={<PurchaseInward />} />
      <Route  path="/add" element={<AddPurchaseInward />} />
      <Route  path="/view/:id" element={<ViewPurchaseInward />} />
      <Route  path="/edit/:id" element={<EditPurchaseInward />} />
    </Routes>
    </div>
  );
}

export default PurchaseInwardRoute;
