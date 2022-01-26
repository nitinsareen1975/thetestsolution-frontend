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
      },
      {
        key: "/admin/users/roles",
        label: "Manage User Roles",
        roles: ["Admin"]
      }
    ]
  },
  {
    key: "/admin/Labs",
    label: "Manage Lab",
    roles: ["Admin"],
    leftIcon: <DashboardOutlined />,
    children: [
      {
        key: "/admin/Labs",
        label: "Manage labs",
        roles: ["Admin"]
      },
      {
        key: "/admin/labs/add",
        label: "Add new Lab",
        roles: ["Admin"]
      },
    ]
  }
];

export default {
  adminOptions
};