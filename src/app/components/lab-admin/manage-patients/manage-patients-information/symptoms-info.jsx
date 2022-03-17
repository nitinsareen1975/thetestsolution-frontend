import React from "react";
import { Col, Form, Radio, Row, Typography } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
const output = ({ ...props }) => {
    return <div>
        <Row gutter={24}>
            <Col xs={24} sm={24}>
                <Typography.Title level={5}>Symptoms Info</Typography.Title>
            </Col>
        </Row>
        <hr />
        <Row gutter={24} className="horizontal-form">
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Form.Item name="have_fever" label="Do you have a fever?" >
                    <Radio.Group defaultValue={props.data.have_fever}>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Form.Item name="have_cough" label="Do you have a cough?" >
                    <Radio.Group defaultValue={props.data.have_cough}>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Form.Item name="have_breath_shortness" label="Do you have new or increased shortness of breath?" >
                    <Radio.Group defaultValue={props.data.have_breath_shortness}>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Form.Item name="have_decreased_taste" label="Do you have decreased smell or taste?" >
                    <Radio.Group defaultValue={props.data.have_decreased_taste}>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Form.Item name="have_sore_throat" label="Do you have a sore throat?"  >
                    <Radio.Group defaultValue={props.data.have_sore_throat}>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Form.Item name="have_any_symptom" label="Do you have any symptoms?" >
                    <Radio.Group defaultValue={props.data.have_any_symptom}>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Form.Item name="have_muscle_pain" label="Do you have muscle aches or pains?" >
                    <Radio.Group defaultValue={props.data.have_muscle_pain}>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Form.Item name="have_vaccinated" label="Have you been fully vaccinated?" >
                    <Radio.Group defaultValue={props.data.have_vaccinated}>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Col>
        </Row>
    </div>
}
export default output;