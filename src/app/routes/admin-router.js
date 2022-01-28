import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AdminDashboard from "../components/admin/dashboard/index.jsx";
import AdminUsers from "../components/admin/manage-users/list.jsx";
import AddUser from "../components/admin/manage-users/add.jsx";
import  EditUser  from "../components/admin/manage-users/edit.jsx";
//import Roles from "../components/admin/manage-roles/list.jsx";
import ManageLab from "../components/admin/manage-lab/list.jsx";
import AddLab from "../components/admin/manage-lab/add.jsx";
import EditLab  from "../components/admin/manage-lab/edit.jsx"
// Tests 
import ManageTest from "../components/admin/tests/list.jsx";
import AddTest from "../components/admin/tests/add.jsx";
import EditTest  from "../components/admin/tests/edit.jsx"
const routes = [
  {
    path: "",
    component: AdminDashboard
  },
  {
    path: "users",
    component: AdminUsers
  },
  {
    path: "users/add",
    component: AddUser
  },
  {
    path: "users/edit/:id",
    component: EditUser
  },
  {
    path: "labs",
    component: ManageLab
  },
  {
    path: "labs/add",
    component: AddLab
  },
  {
    path: "labs/edit/:id",
    component: EditLab
  },
  {
    path: "tests",
    component: ManageTest
  },
  {
    path: "tests/add/",
    component: AddTest
  },
  {
    path: "tests/edit/:id",
    component: EditTest
  }
];

class AdminRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <div style={style}>
        <Switch>
          {routes.map(singleRoute => {
            const { path, exact, ...otherProps } = singleRoute;
            return (
              <Route
                exact={exact === false ? false : true}
                key={singleRoute.path}
                path={`${url}/${singleRoute.path}`}
                {...otherProps}
              />
            );
          })}
        </Switch>
      </div>
    );
  }
}

export default AdminRouter;
