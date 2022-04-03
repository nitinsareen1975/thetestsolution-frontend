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
import Pricing from "../components/admin/pricing/list.jsx";
import AddPricing from "../components/admin/pricing/add.jsx";
import EditPricing from "../components/admin/pricing/edit.jsx";
import ManageTestTypeNames from "../components/admin/test-type-names/list.jsx";
import AddTestTypeName from "../components/admin/test-type-names/add.jsx";
import EditTestTypeName  from "../components/admin/test-type-names/edit.jsx";
import ManageTestTypeMethods from "../components/admin/test-type-methods/list.jsx";
import AddTestTypeMethod from "../components/admin/test-type-methods/add.jsx";
import EditTestTypeMethod  from "../components/admin/test-type-methods/edit.jsx";
import ManageTestResultTypes from "../components/admin/test-result-types/list.jsx";
import AddTestResultType from "../components/admin/test-result-types/add.jsx";
import EditTestResultType from "../components/admin/test-result-types/edit.jsx";
import GroupEvents from "../components/admin/group-concierge/all-group-events.jsx";
import EditGroupEvent from "../components/admin/group-concierge/edit-group-event.jsx";
import AddGroupEvent from "../components/admin/group-concierge/add-group-event.jsx";
import GroupPatients from "../components/admin/group-concierge/all-group-patients.jsx";
import EditGroupPatient from "../components/admin/group-concierge/edit-group-patient.jsx";
import AddGroupPatient from "../components/admin/group-concierge/add-group-patient.jsx";
import ConciergeResults from "../components/admin/group-concierge/concierge-results.jsx";

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
  },
  {
    path: "pricing",
    component: Pricing
  },
  {
    path: "pricing/edit/:id",
    component: EditPricing
  },
  {
    path: "pricing/add",
    component: AddPricing
  },
  {
    path: "test-type-names",
    component: ManageTestTypeNames
  },
  {
    path: "test-type-names/add",
    component: AddTestTypeName
  },
  {
    path: "test-type-names/edit/:id",
    component: EditTestTypeName
  },
  {
    path: "test-type-methods",
    component: ManageTestTypeMethods
  },
  {
    path: "test-type-methods/add",
    component: AddTestTypeMethod
  },
  {
    path: "test-type-methods/edit/:id",
    component: EditTestTypeMethod
  },
  {
    path: "test-result-types",
    component: ManageTestResultTypes
  },
  {
    path: "test-result-types/add",
    component: AddTestResultType
  },
  {
    path: "test-result-types/edit/:id",
    component: EditTestResultType
  },
  {
    path: "group-concierge/group-events",
    component: GroupEvents
  },
  {
    path: "group-concierge/group-events/edit/:id",
    component: EditGroupEvent
  },
  {
    path: "group-concierge/add-group-event",
    component: AddGroupEvent
  },
  {
    path: "group-concierge/group-patients",
    component: GroupPatients
  },
  {
    path: "group-concierge/group-patients/edit/:id",
    component: EditGroupPatient
  },
  {
    path: "group-concierge/add-group-patient",
    component: AddGroupPatient
  },
  {
    path: "group-concierge/concierge-results",
    component: ConciergeResults
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
