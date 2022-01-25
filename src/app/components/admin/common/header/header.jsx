import React from "react";
import { Row, Col, Badge, Dropdown, Menu } from "antd";
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import LanguageSwitcher from "../../../../services/languageProvider/switcher";

const AdminHeader = () => {
    const menu = (
        <Menu>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <a href="/login">
                Logout
            </a>
          </Menu.Item>
        </Menu>
      );
    return <Row justify="end">
              {/* <LanguageSwitcher /> */}
              <div className="notifation">
                <Badge count={5}>
                  <BellOutlined />
                </Badge>
              </div>
              <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>Hi admin</Dropdown.Button>
    </Row>
}
export default AdminHeader;