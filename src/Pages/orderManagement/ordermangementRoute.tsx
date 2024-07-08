
import { Route, Routes } from "react-router-dom";

import NavigationBar from "../../components/NavigationBar";
import AddOrderManagement from "./AddOrderManagement/AddOrderManagement";
import EditOrderManagement from "./EditOrderManagement/EditOrderManagement";
import ViewOrderManagement from "./ViewOrderManagement/ViewOrderManagement";
import OrderManagement from "./Ordermangenment";

function OrderManagementRoute() {
  return (
    <div>
         <NavigationBar/>
       <Routes>
        <Route path="/" index element={< OrderManagement/>} />
        <Route path="/add"  element={<AddOrderManagement />} />
        <Route path="/edit"  element={<EditOrderManagement />} />
        <Route path="/view"  element={<ViewOrderManagement />} />
       
      </Routes>  
    </div>
  );
}

export default OrderManagementRoute;
