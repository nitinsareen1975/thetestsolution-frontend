import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Menu } from "antd";

const { SubMenu } = Menu;

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { roleName: "" };
  }
  componentDidMount() {
    //console.log(this.props.history);
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser.role) this.setState({ roleName: currentUser.role });
  }

  getMenuItem = ({ singleOption }) => {
    const { key, label, leftIcon, children } = singleOption;
    if (children) {
      return (
        singleOption.roles &&
        singleOption.roles.indexOf(this.state.roleName) !== -1 && (
          <SubMenu
            key={key}
            title={
              <span className="isoMenuHolder">
                {leftIcon}
                <span className="nav-text">
                  {label}
                </span>
              </span>
            }
          >
            {children.map(child => {
              return (
                child.roles &&
                child.roles.indexOf(this.state.roleName) !== -1 && (
                  <Menu.Item key={child.key}>
                    <Link to={child.key}>
                      {child.leftIcon}
                        {child.label}
                      {child.alertsCount}
                    </Link>
                  </Menu.Item>
                )
              );
            })}
          </SubMenu>
        )
      );
    }
    return (
      singleOption.roles &&
      singleOption.roles.indexOf(this.state.roleName) !== -1 && (
        <Menu.Item key={key}>
          <Link to={`${key}`}>
            <span className="isoMenuHolder">
              {leftIcon}
              <span className="nav-text">
                <IntlMessages id={label} />
              </span>
            </span>
          </Link>
        </Menu.Item>
      )
    );
  };

  render() {
    return (
      <div className="menu">
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[this.props.history.location.pathname]}
        >
          {this.props.options &&
            this.props.options.map(singleOption =>
              this.getMenuItem({ singleOption })
            )}
        </Menu>
      </div>
    );
  }
}

export default withRouter(SideBar);
