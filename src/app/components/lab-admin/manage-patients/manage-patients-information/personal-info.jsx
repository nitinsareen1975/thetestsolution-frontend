import React from "react";
import { Col, DatePicker, Form, Typography, Row, Select } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
const output = ({ ...props }) => {
    return <div>
            <Row gutter={24}>
                <Col xs={24} sm={24}>
                    <Typography.Title level={4}>Personal Info</Typography.Title>
                </Col>
            </Row>
            <hr />
            <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item name="gender" label="Sex" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Select placeholder="sex">
                            <Select.Option value="Male">Male</Select.Option>
                            <Select.Option value="Female">Female</Select.Option>
                            <Select.Option value="Other">Other</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item name="dob" label="Birthday" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <DatePicker placeholder="Date Of Birth" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item name="ethnicity" label="Ethnicity" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Select placeholder="Ethnicity">
                            <Select.Option value="Hispanic">Hispanic</Select.Option>
                            <Select.Option value="Non-Hispanic">Non-Hispanic</Select.Option>
                            <Select.Option value="No Response">No Response</Select.Option>
                            <Select.Option value="Unknown">Unknown</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item name="race" label="Race" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Select placeholder="Race">
                            <Select.Option value="White">White</Select.Option>
                            <Select.Option value="Black">Black</Select.Option>
                            <Select.Option value="American Indian or Alaska Native">American Indian or Alaska Native</Select.Option>
                            <Select.Option value="Asian">Asian</Select.Option>
                            <Select.Option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</Select.Option>
                            <Select.Option value="Other">Other</Select.Option>
                            <Select.Option value="Unknown">Unknown</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </div>
}
export default output;