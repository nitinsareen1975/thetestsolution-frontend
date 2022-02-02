import React from "react";
import { 
  DashboardOutlined, 
  UserOutlined, 
  ExperimentOutlined,
  AuditOutlined,
  AimOutlined,
  FileSearchOutlined
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

const labAdminOptions = [{
    key: "/lab",
    label: "Dashboard",
    roles: ["Doctor"],
    leftIcon: <DashboardOutlined />
  },
  {
    key: "/lab/users",
    label: "Manage Users",
    leftIcon: <UserOutlined />,
    roles: ["Doctor"],
    children: [
      {
        key: "/lab/users",
        label: "Manage Users",
        roles: ["Doctor"]
      },
      {
        key: "/lab/users/add",
        label: "Add new user",
        roles: ["Doctor"]
      }
    ]
  },
  {
    key: "/lab/patients",
    label: "Manage Patients",
    leftIcon: <AimOutlined />,
    roles: ["Doctor"],
    children: [
      {
        key: "/lab/patients",
        label: "Manage Patients",
        roles: ["Doctor"]
      },
      {
        key: "/lab/patients/scheduled",
        label: "Scheduled List",
        roles: ["Doctor"]
      },
      {
        key: "/lab/patients/add",
        label: "Add new patient",
        roles: ["Doctor"]
      }
    ]
  },
  {
    key: "/lab/reports",
    label: "Reports",
    leftIcon: <FileSearchOutlined />,
    roles: ["Doctor"],
    children: [
      {
        key: "/lab/reports",
        label: "All Reports",
        roles: ["Doctor"]
      },
      {
        key: "/lab/reports/checkin",
        label: "CheckIn List",
        roles: ["Doctor"]
      }
    ]
  }
];

export default {
  adminOptions,
  labAdminOptions
};