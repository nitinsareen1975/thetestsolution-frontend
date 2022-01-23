import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SideBar from "../sidebar/sidebar.jsx";
import AdminHeader from "./common/header/header.jsx";
import AdminRouter from "../../routes/admin-router";
import * as adminActions from "../../redux/actions/admin-actions";
import { Layout, Modal, Form } from "antd";
import options from "../sidebar/options.js";

const { Header, Sider, Content } = Layout;
class AdminDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { url } = this.props.match;
    return (
      <div id="components-layout-demo-custom-trigger">
        <Layout>
          <Header
            className="header"
            style={{
              background: "#fff",
              position: "sticky",
              zIndex: 100,
              top: 0,
              left: 0,
              width: "100%",
              padding: 0,
              overflow: "hidden"
            }}
            match={this.props.match}
            selectedtheme={this.props.theme}
            location={this.props.location}
            history={this.props.history}
          //userData={this.props.userData}
          >
            <AdminHeader />
          </Header>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={!this.props.sidebar}
              style={{
                overflow: "auto",
                height: "100vh",
                position: "sticky",
                top: 0,
                left: 0
              }}
              width={300}
            >
              <SideBar options={options.adminOptions} userType="admin" />
            </Sider>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                maxWidth: "100%",
                position: "relative",
                minHeight: 280
              }}
            >
              <AdminRouter url={url} />
            </Content>
          </Layout>
        </Layout>
        {/*<AuthTokenTimer/>*/}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    adminConfig: state.adminConfig
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...adminActions },
    dispatch
  );
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    AdminDash
  )
);