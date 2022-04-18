import React, { useEffect, useState } from "react";
import { Col, Form, Radio, Row, Typography, DatePicker, TimePicker, Alert, Select } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
import * as UserService from "../../../../services/user-service";
import GroupConciergeAPI from "../../../../redux/api/group-concierge-api";
import moment from "moment";
import MaskedInput from 'antd-mask-input';

const { Option } = Select;
const output = ({ ...props }) => {
    const [events, setEvents] = useState([]);
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
        await GroupConciergeAPI.getGroupEvents(args).then(resp => {
            if (resp.status && resp.status === true) {
                setEvents(resp.data);
            }
        });
    }, []);

    const onSelectEvent = (eventId) => {
        props.setGroupAssigned(eventId);
        var event = events.find(e => e.id === eventId);
        if(typeof event !== "undefined" && typeof event.id !== "undefined" && typeof event.lab_location !== "undefined"){
            props.setLabAssigned(event.lab_location);
        }
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
                <Form.Item name="group_id" label="Select Group Event" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Select
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        style={{ width: '100%' }}
                        placeholder="Filter by event"
                        onChange={(v) => onSelectEvent(v)}
                        maxTagCount="responsive"
                    >
                        {events.length > 0 && events.map(function (event) {
                            return (
                                <Option key={event.id} value={event.id}>
                                    {event.name}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={15}>
            <Col xs={24} md={8}>
                <Form.Item name="scheduled_date" label="Date of Appointment"/*  rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]} */>
                    <MaskedInput mask="11/11/1111" placeholder="MM/DD/YYYY"/>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item name="scheduled_time" label="Time of Appointment"/*  rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]} */>
                    <TimePicker use12Hours minuteStep={5} format="h:mm a"  disabledHours={() => [21, 22, 23, 24, 1, 2, 3, 4, 5, 6, 7]} placeholder="Time Of Appointment" />
                </Form.Item>
            </Col>
        </Row>
    </div>
}
export default output;