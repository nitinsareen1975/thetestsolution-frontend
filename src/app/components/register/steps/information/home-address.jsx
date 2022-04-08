import React from "react";
import { Col, Form, Input, Row, Button, Select } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
const { Option } = Select;
const output = ({ ...props }) => {
    var _countries = (typeof props.countries === "undefined") ? [] : props.countries;
    return <Form layout="vertical" onFinish={(values) => props.next(values)} initialValues={props.data}>
        <h2 className="form-section-title">Home Address</h2>
        <Row gutter={15}>
            <Col xs={24}>
                <Form.Item name="street" label="Address line 1" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Input placeholder="Address line 1" />
                </Form.Item>
            </Col>
            <Col xs={24}>
                <Form.Item name="street2" label="Address line 2">
                    <Input placeholder="Address line 2" />
                </Form.Item>
            </Col>
            <Col xs={24} md={6}>
                <Form.Item name="city" label="City" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Input placeholder="City" />
                </Form.Item>
            </Col>
            <Col xs={24} md={6}>
                <Form.Item name="state" label="State" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Input placeholder="State" />
                </Form.Item>
            </Col>
            <Col xs={24} md={6}>
                <Form.Item name="country" label="Country" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Select
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {_countries.map(function (item) {
                            return (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={24} md={6}>
                <Form.Item name="zip" label="Zip Code" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Input placeholder="Zip Code" />
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