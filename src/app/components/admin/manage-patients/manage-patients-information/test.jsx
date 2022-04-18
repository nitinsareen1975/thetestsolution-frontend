import React, { useEffect, useState } from "react";
import { Col, Form, Radio, Row, Typography, DatePicker, TimePicker, Alert, Select } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
import * as UserService from "../../../../services/user-service";
import LabAPI from "../../../../redux/api/lab-api";
import moment from "moment";
import MaskedInput from 'antd-mask-input';
const { Option } = Select;
const output = ({ ...props }) => {
    const [labs, setLabs] = useState([]);
    useEffect(async () => {
        var lab_assigned = 0;
        if (props.data && props.data.lab_assigned) {
            lab_assigned = props.data.lab_assigned;
        }
        var args = {
            filters: {},
            pagination: {},
            sorter: { column: "name", order: "asc" }
        }
        await LabAPI.getGlobalLabs(args).then(resp => {
            if (resp.status && resp.status === true) {
                setLabs(resp.data);
            }
        });
    }, []);

    const onSelectLab = (values) => {
        props.setLabAssigned(values);
        props.setPricingId(0);
    }

    return <div>
        <Row gutter={24}>
            <Col xs={24} sm={24}>
                <Typography.Title level={5}>Test & Schedule</Typography.Title>
            </Col>
        </Row>
        <hr />
        <Row gutter={24}>
            <Col sm={16} xs={24}>
                <Form.Item name="lab_assigned" label="Select a Lab" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Select
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        style={{ width: '100%' }}
                        placeholder="Filter by lab"
                        onChange={(v) => onSelectLab(v)}
                        maxTagCount="responsive"
                    >
                        {labs.length > 0 && labs.map(function (lab) {
                            return (
                                <Option key={lab.id} value={lab.id}>
                                    {lab.name} ({lab.street}, {lab.city}, {lab.state}, {lab.zip})
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={15}>
            <Col xs={24} md={8}>
                <Form.Item name="scheduled_date" label="Date of Appointment" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <MaskedInput mask="11/11/1111" placeholder="MM/DD/YYYY"/>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item name="scheduled_time" label="Time of Appointment" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <TimePicker use12Hours minuteStep={5} format="h:mm a"  disabledHours={() => [21, 22, 23, 24, 1, 2, 3, 4, 5, 6, 7]} placeholder="Time Of Appointment" />
                </Form.Item>
            </Col>
        </Row>
    </div>
}
export default output;