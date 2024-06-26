
import { Route, Routes } from "react-router-dom";
import UserManagement from "./UserManagement";
import NavigationBar from "../../components/NavigationBar";
import AddUser from "./AddUser/AddUser";
import Permission from "./Permission/Permission";
import EditUser from "./EditUser/EditUser";
import ViewUser from "./ViewUser/ViewUser";

function UserManagementRoute() {
  return (
    <div>
        <NavigationBar/>
      <Routes>
        <Route path="/" index element={<UserManagement />} />
        <Route path="/add-user"  element={<AddUser />} />
        <Route path="/edit-user/:id"  element={<EditUser />} />
        <Route path="/view-user/:id"  element={<ViewUser />} />
        <Route path="/permission/:id"  element={<Permission />} />
      </Routes>
    </div>
  );
}

export default UserManagementRoute;
