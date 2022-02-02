import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../components/lab-admin/dashboard/index.jsx";
import ManageUsers from "../components/lab-admin/manage-users/list.jsx";
import AddUser from "../components/lab-admin/manage-users/add.jsx";
import  EditUser  from "../components/lab-admin/manage-users/edit.jsx";
const routes = [
  {
    path: "",
    component: Dashboard
  },
  {
    path: "users",
    component: ManageUsers
  },
  {
    path: "users/add",
    component: AddUser
  },
  {
    path: "users/edit/:id",
    component: EditUser
  }
];

class LabAdminRouter extends Component {
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

export default LabAdminRouter;