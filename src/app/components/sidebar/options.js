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
    roles: ["Administrator"],
    leftIcon: <DashboardOutlined />
  },
  {
    key: "/admin/users",
    label: "Manage Users",
    leftIcon: <UserOutlined />,
    roles: ["Administrator"],
    children: [
      {
        key: "/admin/users",
        label: "Manage Users",
        roles: ["Administrator"]
      },
      {
        key: "/admin/users/add",
        label: "Add new user",
        roles: ["Administrator"]
      },
      {
        key: "/admin/users/roles",
        label: "Manage User Roles",
        roles: ["Administrator"]
      }
    ]
  },
  {
    key: "/admin/labs",
    label: "Manage Labs",
    roles: ["Administrator"],
    leftIcon: <DashboardOutlined />,
      children: [
        {
          key: "/admin/labs",
          label: "Manage Labs",
          roles: ["Administrator"]
        },
        {
          key: "/admin/labs/add",
          label: "Add new lab",
          roles: ["Administrator"]
        }
      ]
  }
];

export default {
  adminOptions
};