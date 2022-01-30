import React from "react";
import { 
  DashboardOutlined, 
  UserOutlined, 
  ExperimentOutlined,
  AuditOutlined
} from '@ant-design/icons';

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
      }
    ]
  },
  {
    key: "/admin/labs",
    label: "Manage Labs",
    roles: ["Administrator"],
    leftIcon: <ExperimentOutlined />,
    children: [
      {
        key: "/admin/labs",
        label: "Manage Labs",
        roles: ["Administrator"]
      },
      {
        key: "/admin/labs/add",
        label: "Add New Lab",
        roles: ["Administrator"]
      }
    ]
  }
  ,
  {
    key: "/admin/test-types",
    label: "Test Types",
    roles: ["Administrator"],
    leftIcon: <AuditOutlined />,
    children: [
      {
        key: "/admin/test-types",
        label: "Tests List",
        roles: ["Administrator"]
      },
      {
        key: "/admin/test-types/add",
        label: "Add New Test",
        roles: ["Administrator"]
      }
    ]
  }
];

export default {
  adminOptions
};