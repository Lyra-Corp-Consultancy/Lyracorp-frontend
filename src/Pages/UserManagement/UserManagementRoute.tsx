import React from "react";
import { Route, Routes } from "react-router-dom";
import UserManagement from "./UserManagement";
import NavigationBar from "../../components/NavigationBar";
import AddUser from "./AddUser/AddUser";
import Permission from "./Permission/Permission";

function UserManagementRoute() {
  return (
    <div>
        <NavigationBar/>
      <Routes>
        <Route path="/" index element={<UserManagement />} />
        <Route path="/add-user"  element={<AddUser />} />
        <Route path="/permission/:id"  element={<Permission />} />
      </Routes>
    </div>
  );
}

export default UserManagementRoute;
