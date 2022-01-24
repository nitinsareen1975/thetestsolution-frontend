import React from "react";

/* import {
  HomeSvg,
  ManageUser
} from "../../assets/svg/sidebar-icons.jsx"; */
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

const HomeIcon = props => < Icon component={
  HomeSvg
} {
  ...props
  }
/>;
const ManageUserIcon = props => < Icon component={
  ManageUser
} {
  ...props
  }
/>;
const adminOptions = [{
    key: "/admin/",
    label: "Dashboard",
    roles: ["Admin", "SuperAdmin", "CSR"],
    leftIcon: <DashboardOutlined />
  },
  {
    key: "/admin/users/",
    //label: "admin.sidebar.manageUserRole",
    label: "Manage Users",
    leftIcon: <UserOutlined />,
    roles: ["Admin", "SuperAdmin"],
    /* children: [{
        key: "/admin/users/",
        label: "admin.sidebar.submenu.ManageUser",
        roles: ["Administrator", "SuperAdmin"]
      },
      {
        key: "/admin/roles/",
        label: "admin.sidebar.submenu.ManageRole",
        roles: ["Administrator", "SuperAdmin"]
      },

    ] */
  },
  {
    key: "/admin/settings/",
    label: "Dashboard",
    roles: ["Admin", "SuperAdmin", "CSR"],
    leftIcon: <DashboardOutlined />
  }
];

export default {
  adminOptions
};