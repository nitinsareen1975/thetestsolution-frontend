import React from "react";
import { Col, Form, Input, Row, Button } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
const output = ({ ...props }) => {
    return <Form layout="vertical" onFinish={(values) => props.next(values)} initialValues={props.data}>
        <h2 className="form-section-title">Contact Info</h2>
        <Row gutter={15}>
            <Col xs={24} md={8}>
                <Form.Item name="firstname" label="Full Name" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Input placeholder="Full Name" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item name="middlename" label="Middle Name">
                    <Input placeholder="Middle Name" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item name="lastname" label="Last Name" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Input placeholder="Last Name" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item name="email" label="Your Email" rules={[{ type: 'email', required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Input placeholder="Enter Email" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    name="cemail"
                    onPaste={(e) => { e.preventDefault(); return false; }}
                    label="Confirm Your Email"
                    dependencies={['email']}
                    rules={[
                        {
                            type: 'email',
                            required: true,
                            message: <IntlMessages id="admin.input.required" />
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('email') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The email address that you entered do not match!'));
                            },
                        })
                    ]}
                >
                    <Input placeholder="Confirm Email" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Input placeholder="Phone Number" />
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <div className="steps-action">
                <Button onClick={props.prev}>
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