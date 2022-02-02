import React from "react";
import { Col, DatePicker, Form, Radio, Row, Select } from "antd";
const output = () => {
    return <div>
        <h2 className="form-section-title">Test</h2>
        <Row gutter={15}>           
            <Col xs={24}> 
                <Form.Item name={['user', 'selecttest']} label="Select Test" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value="RT-PCR">RT-PCR</Radio>
                        <Radio value="Rapid Antigen">Rapid Antigen</Radio>
                        <Radio value="PCR">PCR</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
        </Row>
    </div>
}
export default output;