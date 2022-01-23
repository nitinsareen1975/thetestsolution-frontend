import React, { Component } from "react";
import ActivityLog from "../audit-logs/audit-logs";

class UserAuditLogs extends Component {
  state = {
    data: []
  }
  render() {
      return (
        <ActivityLog for="users"/>
      )
  }
}
export default UserAuditLogs;