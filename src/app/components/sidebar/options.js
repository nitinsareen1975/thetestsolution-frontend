import React from "react";
import { 
  DashboardOutlined, 
  UserOutlined, 
  ExperimentOutlined,
  AuditOutlined,
  AimOutlined,
  FileSearchOutlined,
  CreditCardOutlined,
  DeploymentUnitOutlined
} from '@ant-design/icons';

const adminOptions = [{
    key: "/admin",
    label: "Dashboard",
    roles: ["Administrator"],
    leftIcon: <DashboardOutlined />
  },
  {
    key: "/admin/all-patients",
    label: "View All Patients",
    roles: ["Administrator"],
    leftIcon: <AimOutlined />
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
  },
  {
    key: "/admin/pricing",
    label: "Manage Pricing",
    leftIcon: <CreditCardOutlined />,
    roles: ["Administrator"],
    children: [
      {
        key: "/admin/pricing",
        label: "View Pricing",
        roles: ["Administrator"]
      },
      {
        key: "/admin/pricing/add",
        label: "Add new pricing",
        roles: ["Administrator"]
      }
    ]
  },
  {
    key: "/admin/test-types",
    label: "Manage Tests",
    roles: ["Administrator"],
    leftIcon: <AuditOutlined />,
    children: [
      {
        key: "/admin/test-types",
        label: "View All Tests",
        roles: ["Administrator"]
      },
      {
        key: "/admin/test-types/add",
        label: "Add New Test",
        roles: ["Administrator"]
      },
      {
        key: "--hr--"
      },
      {
        key: "/admin/test-type-methods",
        label: "Observation Definitions",
        roles: ["Administrator"]
      },
      {
        key: "/admin/test-type-names",
        label: "Test Types",
        roles: ["Administrator"]
      },
      {
        key: "/admin/test-result-types",
        label: "Result Types",
        roles: ["Administrator"]
      }
    ]
  },
  /* {
    key: "/admin/test-type-names",
    label: "Manage Test Types",
    roles: ["Administrator"],
    leftIcon: <DeploymentUnitOutlined />,
    children: [
      {
        key: "/admin/test-type-names",
        label: "View All",
        roles: ["Administrator"]
      },
      {
        key: "/admin/test-type-names/add",
        label: "Add New Type",
        roles: ["Administrator"]
      },
      {
        key: "/admin/test-type-names/add",
        label: "Observation Definitions",
        roles: ["Administrator"]
      }
    ]
  }, */
  {
    key: "/admin/users",
    label: "Manage Users",
    leftIcon: <UserOutlined />,
    roles: ["Administrator"],
    children: [
      {
        key: "/admin/users",
        label: "All Users",
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
    key: "/admin/reports",
    label: "Reports",
    leftIcon: <FileSearchOutlined />,
    roles: ["Administrator"],
    children: [
      /* {
        key: "/admin/reports/test-results",
        label: "Test Results",
        roles: ["Administrator"]
      }, */
      {
        key: "/admin/reports/all",
        label: "All Reports",
        roles: ["Administrator"]
      },
      {
        key: "/admin/reports/revenue",
        label: "Revenue",
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
    key: "/lab/patients",
    label: "Manage Patients",
    leftIcon: <AimOutlined />,
    roles: ["Doctor"],
    children: [
      {
        key: "/lab/patients",
        label: "Scheduled List",
        roles: ["Doctor"]
      },
      {
        key: "/lab/patients/checkedin",
        label: "CheckedIn List",
        roles: ["Doctor"]
      },
      {
        key: "/lab/patients/pending-results",
        label: "Pending Results",
        roles: ["Doctor"]
      },
      {
        key: "/lab/patients/completed",
        label: "Completed",
        roles: ["Doctor"]
      },
      {
        key: "--hr--"
      },
      {
        key: "/lab/patients/add",
        label: "Create New Patient",
        roles: ["Doctor"]
      }
    ]
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
    key: "/lab/reports",
    label: "Reports",
    leftIcon: <FileSearchOutlined />,
    roles: ["Doctor"],
    children: [
      /* {
        key: "/lab/reports/test-results",
        label: "Completed Results",
        roles: ["Doctor"]
      }, */
      {
        key: "/lab/reports/all",
        label: "All Reports",
        roles: ["Doctor"]
      }
    ]
  }
];

export default {
  adminOptions,
  labAdminOptions
};