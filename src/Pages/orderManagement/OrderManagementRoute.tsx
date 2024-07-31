
import { Route, Routes } from "react-router-dom";

import NavigationBar from "../../components/NavigationBar";
import AddOrderManagement from "./AddOrderManagement/AddOrderManagement";
import EditOrderManagement from "./EditOrderManagement/EditOrderManagement";
import ViewOrderManagement from "./ViewOrderManagement/ViewOrderManagement";
import OrderManagement from "./OrderManagement";
 //test
function OrderManagementRoute() {
  return (
    <div>
         <NavigationBar/>
       <Routes>
        <Route path="/" index element={< OrderManagement/>} />
        <Route path="/add"  element={<AddOrderManagement />} />
        <Route path="/edit/:id"  element={<EditOrderManagement />} />
        <Route path="/view/:id"  element={<ViewOrderManagement />} />
       
      </Routes>  
    </div>
  );
}

export default OrderManagementRoute;
