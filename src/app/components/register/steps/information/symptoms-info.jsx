import React from "react";
import { Col, Form, Input, Radio, Row, Switch } from "antd";
const output = () => {
    return <div>
        <h2 className="form-section-title">Symptoms Info</h2>
        <Row gutter={15} className="horizontal-form">
            <Col xs={24} md={8}>            
                <Form.Item name={['user', 'fever']} label="Do you have a fever?" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                    </Radio.Group>                  
                </Form.Item>
            </Col>            
            <Col xs={24} md={8}> 
                <Form.Item name={['user', 'cough']} label="Do you have a cough?" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name={['user', 'shortnessbreath']} label="Do you have new or increased shortness of breath?" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name={['user', 'decreasedsmelltaste']} label="Do you have decreased smell or taste?" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name={['user', 'sorethroat']} label="Do you have a sore throat?" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name={['user', 'anysymptoms']} label="Do you have any symptoms?" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name={['user', 'musclepains']} label="Do you have muscle aches or pains?" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name={['user', 'vaccinated']} label="Have you been fully vaccinated?" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
        </Row>
    </div>
}
export default output;