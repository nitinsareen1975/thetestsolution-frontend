import React from "react";
import { Col, Form, Input, Row, Button, DatePicker } from "antd";
import IntlMessages from "../../../services/intlMesseges";
const output = ({ ...props }) => {
	return <Form layout="vertical" onFinish={(values) => props.handleSubmit(values)} initialValues={props.data}>
		<h2 className="form-section-title">Payment details</h2>
		<Row gutter={15}>
			<Col xs={24}>
				<Form.Item name="cardholder_name" label="Cardholder Name" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
					<Input placeholder="Cardholder Name" />
				</Form.Item>
			</Col>
		</Row>
		<Row gutter={15}>
			<Col xs={24} md={12}>
				<Form.Item name="card_number" label="Card Number" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
					<Input placeholder="Credit Card Number" />
				</Form.Item>
			</Col>
			<Col xs={24} md={6}>
				<Form.Item name="cvv" label="CVV/CVC Number" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
					<Input placeholder="CVV/CVC" />
				</Form.Item>
			</Col>
			<Col xs={24} md={6}>
				<Form.Item name="expiry_date" label="Expiry Date" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
					<DatePicker placeholder="Expiry Date" />
				</Form.Item>
			</Col>
		</Row>
		<Row gutter={15}>
			<div className="steps-action">
				<Button onClick={props.parentPrev}>
					Previous
				</Button>
				<Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">
					Submit
				</Button>
			</div>
		</Row>
	</Form>
}
export default output;