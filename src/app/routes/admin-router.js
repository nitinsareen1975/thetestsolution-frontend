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
import ManageTestTypes from "../components/admin/test-types/list.jsx";
import AddTestType from "../components/admin/test-types/add.jsx";
import EditTestType  from "../components/admin/test-types/edit.jsx"
import EmployeesList  from "../components/admin/manage-employees/list.jsx"
import EditEmployee  from "../components/admin/manage-employees/edit.jsx"
import AddEmployee  from "../components/admin/manage-employees/add.jsx"
import AllPatients from "../components/admin/manage-patients/all.jsx";
import AddPatient from "../components/admin/manage-patients/add.jsx";
import EditPatient from "../components/admin/manage-patients/edit.jsx";
import MyAccount from "../components/my-account/profile.jsx";
import ChangePassword from "../components/my-account/change-password.jsx";
import TestResults from "../components/admin/reports/test-results.jsx";
import AllReports from "../components/admin/reports/all.jsx";
import RevenueReport from "../components/admin/reports/revenue.jsx";

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
    path: "test-types",
    component: ManageTestTypes
  },
  {
    path: "test-types/add/",
    component: AddTestType
  },
  {
    path: "test-types/edit/:id",
    component: EditTestType
  },
  {
    path: "labs/edit/:id/employees",
    component: EmployeesList
  },
  {
    path: "labs/edit/:id/employees/edit/:employeeId",
    component: EditEmployee
  },
  {
    path: "labs/edit/:id/employees/add",
    component: AddEmployee
  },
  {
    path: "all-patients",
    component: AllPatients
  },
  {
    path: "patients/add",
    component: AddPatient
  },
  {
    path: "patients/edit/:id",
    component: EditPatient
  },
  {
    path: "account",
    component: MyAccount
  },
  {
    path: "account/change-password",
    component: ChangePassword
  },
  {
    path: "reports/test-results",
    component: TestResults
  },
  {
    path: "reports/all",
    component: AllReports
  },
  {
    path: "reports/revenue",
    component: RevenueReport
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
