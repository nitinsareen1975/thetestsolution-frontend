import React, { useEffect, useState } from "react";
import { Col, Form, Radio, Row, Typography, DatePicker, TimePicker, Alert, Select } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
import * as UserService from "../../../../services/user-service";
import LabAPI from "../../../../redux/api/lab-api";
const { Option } = Select;
const output = ({ ...props }) => {
    const [pricing, setPricing] = useState([]);
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
                getPricing(lab_assigned);
            }
        });
    }, []);

    const getPricing = async (lab_assigned) => {
        var args = {
            filters: {},
            pagination: {},
            sorter: { column: "name", order: "asc" }
        }
        await LabAPI.getGlobalLabPricing(lab_assigned, args).then(resp => {
            if (resp.status && resp.status === true) {
                setPricing(resp.data);
                props.setPricingArray(resp.data);
            }
        });
    }

    const onSelectLab = (values) => {
        getPricing(values);
        props.changeFormFieldValue("pricing_id", "");
        props.setPricingId(0);
    }

    const setPricingState = (e) => {
        props.setPricingId(e.target.value);
    };
    
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
        <Row gutter={24}>
            {labs.length > 0 && pricing.length > 0 ?
                <Col xs={24}><Form.Item name="pricing_id" label="Select Type of Test" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Radio.Group className="radio-test-price-wrapper" onChange={(v) => setPricingState(v)}>
                        {pricing.map(price => {
                            /* var hms = price.estimated_hours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + price.estimated_minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + price.estimated_seconds.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
                            var hmsArr = hms.split(':');
                            var seconds = (+hmsArr[0]) * 60 * 60 + (+hmsArr[1]) * 60 + (+hmsArr[2]);
                            var duration = UserService.secondsToHms(seconds); */
                            return <Radio.Button key={price.id} value={price.id} >
                                <div className="radio-test-price">
                                    <div className="pricing-title">{price.test_label}</div>
                                    <div className="pricing-amount">
                                        <span className="pricing-amount-currency">$</span>
                                        {price.price}
                                    </div>
                                    <div className="pricing-results">Results in {price.test_duration}</div>
                                </div>
                            </Radio.Button>
                        })}
                    </Radio.Group>
                </Form.Item></Col>
                : <Col sm={16} xs={24} style={{ marginBottom: 10 }} ><Alert message="No pricing found." type="error" /></Col>}
        </Row>
        <Row gutter={15}>
            <Col xs={24} md={8}>
                <Form.Item name="scheduled_date" label="Date of Appointment" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <DatePicker placeholder="Date Of Appointment" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item name="scheduled_time" label="Time of Appointment" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <TimePicker use12Hours minuteStep={5} format="h:mm a" placeholder="Time Of Appointment" />
                </Form.Item>
            </Col>
        </Row>
    </div>
}
export default output;