import React from "react";
import { Col, Form, Radio, Row, Button } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
const output = ({ ...props }) => {
    return <Form layout="vertical" onFinish={(values) => props.next(values)} initialValues={props.data}>
        <h2 className="form-section-title">Symptoms Info</h2>
        <Row gutter={15} className="horizontal-form">
            <Col xs={24} md={8}>            
                <Form.Item name="have_fever" label="Do you have a fever?" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Radio.Group>
                        <Radio value="1">Yes</Radio>
                        <Radio value="0">No</Radio>
                    </Radio.Group>                  
                </Form.Item>
            </Col>            
            <Col xs={24} md={8}> 
                <Form.Item name="have_cough" label="Do you have a cough?" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Radio.Group>
                        <Radio value="1">Yes</Radio>
                        <Radio value="0">No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name="have_breath_shortness" label="Do you have new or increased shortness of breath?" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Radio.Group>
                        <Radio value="1">Yes</Radio>
                        <Radio value="0">No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name="have_decreased_taste" label="Do you have decreased smell or taste?" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Radio.Group>
                        <Radio value="1">Yes</Radio>
                        <Radio value="0">No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name="have_sore_throat" label="Do you have a sore throat?" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Radio.Group>
                        <Radio value="1">Yes</Radio>
                        <Radio value="0">No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name="have_any_symptom" label="Do you have any symptoms?" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Radio.Group>
                        <Radio value="1">Yes</Radio>
                        <Radio value="0">No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name="have_muscle_pain" label="Do you have muscle aches or pains?" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Radio.Group>
                        <Radio value="1">Yes</Radio>
                        <Radio value="0">No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} md={8}> 
                <Form.Item name="have_vaccinated" label="Have you been fully vaccinated?" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Radio.Group>
                        <Radio value="1">Yes</Radio>
                        <Radio value="0">No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <div className="steps-action">
                <Button  onClick={props.prev}>
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