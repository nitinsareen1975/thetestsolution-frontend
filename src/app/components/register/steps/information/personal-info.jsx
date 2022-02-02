import React from "react";
import { Col, DatePicker, Form, Radio, Row, Select } from "antd";
const output = () => {
    return <div>
        <h2 className="form-section-title">Personal Info</h2>
        <Row gutter={15}>
            <Col xs={24} md={8}>            
                <Form.Item name={['user', 'sex']} label="Sex" rules={[{ required: true }]}>
                <Select placeholder="sex">
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                    <Select.Option value="Other">Other</Select.Option>
                </Select>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name={['user', 'birthday']} label="Birthday" rules={[{ required: true }]}>
                    <DatePicker placeholder="Date Of Birth" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name={['user', 'ethnicity']} label="Ethnicity" rules={[{ required: true }]}>
                    <Select placeholder="Ethnicity">
                        <Select.Option value="Ethnicity">Ethnicity</Select.Option>
                        <Select.Option value="Hispanic">Hispanic</Select.Option>
                        <Select.Option value="Non-Hispanic">Non-Hispanic</Select.Option>
                        <Select.Option value="No Response">No Response</Select.Option>
                        <Select.Option value="Unknown">Unknown</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={24}> 
                <Form.Item name={['user', 'race']} label="Race" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value="white">White</Radio>
                        <Radio value="black">Black</Radio>
                        <Radio value="american indian or alaska native">American Indian or Alaska Native</Radio>
                        <Radio value="asian">Asian</Radio>
                        <Radio value="native hawaiian or other pacific islander">Native Hawaiian or Other Pacific Islander</Radio>
                        <Radio value="other">Other</Radio>
                        <Radio value="unknown">Unknown</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
        </Row>
    </div>
}
export default output;