import React, { useEffect, useState } from "react";
import { Col, Form, Radio, Row, Typography, DatePicker, TimePicker } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
import TestsAPI from "../../../../redux/api/tests-api";
const output = ({ ...props }) => {
    const [tests, setTests] = useState([]);
    useEffect(async () => {
        var args = {
            filters: {},
            pagination: {},
            sorter: { column: "name", order: "asc" }
        }
        await TestsAPI.getGlobalTestTypes(args).then(resp => {
            if (resp.status && resp.status === true) {
                setTests(resp.data);
            }
        });
    }, []);
    return <div>
        <Row gutter={24}>
            <Col xs={24} sm={24}>
                <Typography.Title level={5}>Test & Schedule</Typography.Title>
            </Col>
        </Row>
        <hr />
        <Row gutter={24}>
            <Col xs={24}>
                <Form.Item name="test_type" label="Select Test" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Radio.Group>
                        {tests.map(test => {
                            return <Radio key={test.id} value={test.id}>{test.name}</Radio>
                        })}
                    </Radio.Group>
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={15}>
            <Col xs={24} md={8}>
                <Form.Item name="scheduled_date" label="Date of Appointment" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <DatePicker placeholder="Date Of Appointment" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item name="scheduled_time" label="Time of Appointment" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <TimePicker use12Hours minuteStep={5} format="h:mm a" placeholder="Time Of Appointment"/>
                </Form.Item>
            </Col>
        </Row>
    </div>
}
export default output;