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
    key: "/admin",
    label: "Dashboard",
    roles: ["Admin"],
    leftIcon: <DashboardOutlined />
  },
  {
    key: "/admin/users",
    label: "Manage Users",
    leftIcon: <UserOutlined />,
    roles: ["Admin"],
    children: [
      {
        key: "/admin/users",
        label: "Manage Users",
        roles: ["Admin"]
      },
      {
        key: "/admin/users/add",
        label: "Add new user",
        roles: ["Admin"]
      }
    ]
  },
  {
    key: "/admin/roles",
    label: "Manage User Roles",
    roles: ["Admin"]
  }
];

export default {
  adminOptions
};