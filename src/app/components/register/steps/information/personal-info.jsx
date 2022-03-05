import React from "react";
import { Col, DatePicker, Form, Button, Row, Select } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
import moment from "moment";
const output = ({ ...props }) => {
    return <Form layout="vertical" onFinish={(values) => props.next(values)} initialValues={props.data}>
        <h2 className="form-section-title">Personal Info</h2>
        <Row gutter={15}>
            <Col xs={24} md={8}>
                <Form.Item name="gender" label="Sex" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Select placeholder="sex">
                        <Select.Option value="Male">Male</Select.Option>
                        <Select.Option value="Female">Female</Select.Option>
                        <Select.Option value="Other">Other</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item name="dob" label="Birthday" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <DatePicker placeholder="Date Of Birth" disabledDate={(current) => moment().add(-16, 'years')  <= current} />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item name="ethnicity" label="Ethnicity" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Select placeholder="Ethnicity">
                        <Select.Option value="Hispanic">Hispanic</Select.Option>
                        <Select.Option value="Non-Hispanic">Non-Hispanic</Select.Option>
                        <Select.Option value="No Response">No Response</Select.Option>
                        <Select.Option value="Unknown">Unknown</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={24}>
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
        <Row>
            <div className="steps-action">
                <Button  onClick={props.prev}>
                    Previous
                </Button>
                <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">
                    Next
                </Button>
            </div>
        </Row>
    </Form>
}
export default output;