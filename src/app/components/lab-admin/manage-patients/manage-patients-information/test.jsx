import React, { useEffect, useState } from "react";
import { Col, Form, Radio, Row, Typography, DatePicker, TimePicker, Alert, Select } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
import * as UserService from "../../../../services/user-service";
import LabAPI from "../../../../redux/api/lab-api";
import moment from "moment";
import MaskedInput from 'antd-mask-input';
const output = ({ ...props }) => {
    useEffect(async () => {
        var lab_assigned = 0;
        if (props.data && props.data.lab_assigned) {
            lab_assigned = props.data.lab_assigned;
        }
    }, []);

    return <div>
        <Row gutter={24}>
            <Col xs={24} sm={24}>
                <Typography.Title level={5}>Test & Schedule</Typography.Title>
            </Col>
        </Row>
        <hr />
        <Row gutter={15}>
            <Col xs={24} md={8}>
                <Form.Item name="scheduled_date" label="Date of Appointment" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <MaskedInput mask="11/11/1111" placeholder="MM/DD/YYYY"/>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item name="scheduled_time" label="Time of Appointment" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <TimePicker  use12Hours disabledHours={() => [21, 22, 23, 24, 1, 2, 3, 4, 5, 6, 7]} minuteStep={5} format="h:mm a" placeholder="Time Of Appointment" />
                </Form.Item>
            </Col>
        </Row>
    </div>
}
export default output;