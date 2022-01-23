import React from "react";

import {
  HomeSvg,
  ManageUser
} from "../../assets/svg/sidebar-icons.jsx";

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
    label: "admin.sidebar.Dashboard",
    roles: ["Administrator", "SuperAdmin", "CSR"],
    leftIcon: < HomeIcon />
  },
  {
    key: "/admin/users/",
    //label: "admin.sidebar.manageUserRole",
    label: "admin.sidebar.submenu.ManageUser",
    leftIcon: < ManageUserIcon />,
    roles: ["Administrator", "SuperAdmin"],
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
  }
];

export default {
  adminOptions
};