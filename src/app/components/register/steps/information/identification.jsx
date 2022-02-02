import React from "react";
import { Button, Col, Form, Input, Row, Select, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const output = () => {
    return <div>
        <h2 className="form-section-title">Identification</h2>
        <Row gutter={15}>
            <Col xs={24} md={8}>            
                <Form.Item name={['user', 'idtype']} label="ID Type" rules={[{ required: true }]}>
                <Select placeholder="ID Type">
                    <Select.Option value="Driver License">Driver License</Select.Option>
                    <Select.Option value="Female">Passport</Select.Option>
                </Select>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name={['user', 'idnumber']} label="ID Number" rules={[{ required: true }]}>
                   <Input placeholder="ID Number" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name={['user', 'idcountry']} label="ID Country" rules={[{ required: true }]}>
                   <Input placeholder="ID Country" />
                </Form.Item>
            </Col>
            <Col xs={24}>
                <Form.Item name={['user', 'identificationimage']} label="Select identification image to upload:" rules={[{ required: true }]}>
                <Upload>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                </Form.Item>
            </Col>
        </Row>
    </div>
}
export default output;