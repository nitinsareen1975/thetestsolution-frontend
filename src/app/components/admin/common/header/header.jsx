import React from "react";
import { Row, Col } from "antd";
import Logo from "../../../../assets/images/logo.png";

const AdminHeader = () => {
    return <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={6}>
            <img
                width={120}
                src={Logo}
                className="logo"
                />
        </Col>
        <Col span={18}></Col>
    </Row>
}
export default AdminHeader;