import React from "react";
import { Col, Form, Input, Row, Select, Typography } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
const { Option } = Select;
const output = ({ ...props }) => {
    var _countries = (typeof props.countries === "undefined") ? [] : props.countries;
    return <div>
            <Row gutter={24}>
                <Col xs={24} sm={24}>
                    <Typography.Title level={4}>Home Address</Typography.Title>
                </Col>
                
            </Row>
            <hr />
            <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item name="street" label="Street" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="Street" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item name="city" label="City" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="City" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item name="state" label="State" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="State" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
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
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item name="zip" label="Zip Code" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="Zip Code" />
                    </Form.Item>
                </Col>
            </Row>
        </div>
}
export default output;