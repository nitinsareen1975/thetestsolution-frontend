import React from "react";
import { Col, Form, Input, Row } from "antd";
const output = () => {
    return <div>
        <h2 className="form-section-title">Home Address</h2>
        <Row gutter={15}>
            <Col xs={24}>            
                <Form.Item name={['user', 'street']} label="Street" rules={[{ required: true }]}>
                    <Input placeholder="Street" />
                </Form.Item>
            </Col>            
            <Col xs={24} md={6}> 
                <Form.Item name={['user', 'city']} label="City" rules={[{ required: true }]}>
                    <Input placeholder="City" />
                </Form.Item>
            </Col>
            <Col xs={24} md={6}> 
                <Form.Item name={['user', 'State']} label="State" rules={[{ required: true }]}>
                    <Input placeholder="State" />
                </Form.Item>
            </Col>
            <Col xs={24} md={6}> 
                <Form.Item name={['user', 'Country']} label="Country" rules={[{ required: true }]}>
                    <Input placeholder="Country" />
                </Form.Item>
            </Col>
            <Col xs={24} md={6}> 
                <Form.Item name={['user', 'zipcode']} label="Zip Code" rules={[{ required: true }]}>
                    <Input placeholder="Zip Code" />
                </Form.Item>
            </Col>
        </Row>
    </div>
}
export default output;