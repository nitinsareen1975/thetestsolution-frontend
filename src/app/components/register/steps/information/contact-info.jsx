import React from "react";
import { Col, Form, Input, Row } from "antd";
const output = () => {
    return <div>
        <h2 className="form-section-title">Contact Info</h2>
        <Row gutter={15}>
            <Col xs={24} md={8}>            
                <Form.Item name={['user', 'fullname']} label="Full Name" rules={[{ required: true }]}>
                    <Input placeholder="Full Name" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name={['user', 'middlename']} label="Middle Name" rules={[{ required: true }]}>
                    <Input placeholder="Middle Name" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name={['user', 'lastname']} label="Last Name" rules={[{ required: true }]}>
                    <Input placeholder="Last Name" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name={['user', 'email']} label="Your Email" rules={[{ type: 'email' }]}>
                    <Input placeholder="Enter Email" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name={['user', 'phone']} label="Phone Number" rules={[{ type: 'phone'}]}>
                    <Input placeholder="Phone Number" />
                </Form.Item>
            </Col>
        </Row>
    </div>
}
export default output;