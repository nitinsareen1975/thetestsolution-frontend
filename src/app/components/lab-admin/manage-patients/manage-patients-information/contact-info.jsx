import React from "react";
import { Col, Form, Input, Row, Typography } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
const output = ({ ...props }) => {
    return  <div>
                <Row gutter={24}>
                    <Col xs={24} sm={24}>
                        <Typography.Title level={5}>Contact Info</Typography.Title>
                    </Col>
                    
                </Row>
                <hr />
                <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item name="firstname" label="Full Name" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="Full Name" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item name="middlename" label="Middle Name" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="Middle Name" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item name="lastname" label="Last Name" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="Last Name" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item name="email" label="Your Email" rules={[{ type: 'email', required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="Enter Email" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="Phone Number" />
                    </Form.Item>
                </Col>
            </Row>
        </div>
}
export default output;