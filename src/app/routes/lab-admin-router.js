import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../components/lab-admin/dashboard/index.jsx";
import ManageUsers from "../components/lab-admin/manage-users/list.jsx";
import AddUser from "../components/lab-admin/manage-users/add.jsx";
import  EditUser  from "../components/lab-admin/manage-users/edit.jsx";
import AllPatients  from "../components/lab-admin/manage-patients/list.jsx";
import AddPatient  from "../components/lab-admin/manage-patients/add.jsx";
import EditPatient  from "../components/lab-admin/manage-patients/edit.jsx";
import CheckInList  from "../components/lab-admin/manage-patients/checkedin.jsx";
import PendingResults  from "../components/lab-admin/manage-patients/pending-results.jsx";
import MyAccount from "../components/my-account/profile.jsx";
import ChangePassword from "../components/my-account/change-password.jsx";
import LabSettings from "../components/lab-admin/settings/settings.jsx";
import TestResults from "../components/admin/reports/test-results.jsx";
import AllReports from "../components/admin/reports/all.jsx";
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
  },
  {
    path: "patients",
    component: AllPatients
  },
  {
    path: "patients/edit/:id",
    component: EditPatient
  },
  {
    path: "patients/add",
    component: AddPatient
  },
  {
    path: "patients/checkedin",
    component: CheckInList
  },
  {
    path: "patients/pending-results",
    component: PendingResults
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
    path: "settings",
    component: LabSettings
  },
  {
    path: "reports/test-results",
    component: TestResults
  },
  {
    path: "reports/all",
    component: AllReports
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