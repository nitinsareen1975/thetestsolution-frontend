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
    key: "/admin/Labs",
    label: "Manage Lab",
<<<<<<< HEAD
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
=======
    roles: ["Administrator"],
    leftIcon: <DashboardOutlined />
>>>>>>> 6bd28a014d4cd45ea6c5287bdcdfe38abde4d3b0
  }
];

export default {
  adminOptions
};