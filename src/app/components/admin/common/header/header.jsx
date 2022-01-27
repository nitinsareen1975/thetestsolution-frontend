import React from "react";
import { Row, Button, Badge, Dropdown, Menu } from "antd";
import { BellOutlined, UserOutlined } from '@ant-design/icons';
// import LanguageSwitcher from "../../../../services/languageProvider/switcher";
import * as UserService from "../../../../services/user-service";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
const AdminHeader = ({...props}) => {
    const menu = (
        <Menu>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <a onClick={() => UserService.logOut()}>
                Logout
            </a>
          </Menu.Item>
        </Menu>
      );
    return <Row justify="space-between">
      <Button className="menu-toggle" onClick={props.onCollapse}>
          {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
              {/* <LanguageSwitcher /> */}
        <div className="right-nav">
          <div className="notifation">
            <Badge count={5}>
              <BellOutlined />
            </Badge>
          </div>
          <Dropdown.Button overlay={menu} trigger={['click']} placement="bottomCenter" icon={<UserOutlined />}>Hi admin</Dropdown.Button>
        </div>
    </Row>
}
export default AdminHeader;