import React, { useEffect, useState } from "react";
import { Col, Form, Radio, Row, Typography, Input, DatePicker } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
const output = ({ ...props }) => {
    return <div>
        <Row gutter={24}>
            <Col xs={24} sm={24}>
                <Typography.Title level={5}>Payment</Typography.Title>
            </Col>
        </Row>
        <hr />
        <Row gutter={15}>
            <Col xs={24} md={6}>
                <Form.Item name="payment_provider" label="Payment Provider Name" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Input placeholder="For example: Stripe, Paypal etc." disabled/>
                </Form.Item>
            </Col>
            <Col xs={24} md={6}>
                <Form.Item name="transaction_id" label="Transaction ID" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Input placeholder="Transaction ID generated after payment" disabled/>
                </Form.Item>
            </Col>
        </Row>
    </div>
}
export default output;