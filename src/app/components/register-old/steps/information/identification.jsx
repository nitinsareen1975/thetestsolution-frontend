import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import IntlMessages from "../../../../services/intlMesseges";
import { notifyUser } from "../../../../services/notification-service";
const { Option } = Select;
const output = ({ ...props }) => {
	const [identifier_doc, setIdentifier_doc] = useState(null);
	const uploaderProps = (field, accept) => {
		return {
			showUploadList: true,
			accept: accept,
			multiple: false,
			beforeUpload: file => {
				if (file.type.indexOf('image/') === -1) {
					notifyUser(<IntlMessages id="admin.fileupload.acceptedtypes" />, "error");
					setIdentifier_doc(null);
				} else {
					setIdentifier_doc(file);
				}
				return false;
			},
			onRemove: _file => {
				setIdentifier_doc(null);
			},
			onSuccess: _res => {
				setIdentifier_doc(null);
			},
			onError(_err) {
				notifyUser(<IntlMessages id="admin.fileupload.failed" />, "error");
			}
		}
	}
	var _countries = (typeof props.countries === "undefined") ? [] : props.countries;
	return <Form layout="vertical" onFinish={(values) => props.next(values)} initialValues={props.data}>
		<h2 className="form-section-title">Identification</h2>
		<Row gutter={15}>
			<Col xs={24} md={6}>
				<Form.Item name="identifier_type" label="ID Type" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
					<Select placeholder="ID Type">
						<Select.Option value="Driver License">Driver License</Select.Option>
						<Select.Option value="Passport">Passport</Select.Option>
					</Select>
				</Form.Item>
			</Col>
			<Col xs={24} md={6}>
				<Form.Item name="identifier" label="ID Number" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
					<Input placeholder="ID Number" />
				</Form.Item>
			</Col>
			<Col xs={24} md={6}>
				<Form.Item name="identifier_country" label="Issuing Country" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
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
				<Form.Item name="identifier_state" label="Issuing State" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
					<Input placeholder="State" />
				</Form.Item>
			</Col>
		</Row>
		<Row>
			<Col xs={24} md={8}>
				<Form.Item name="identifier_doc" label="Select identification image to upload:" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
					<Upload {...uploaderProps('identifier_doc', '.jpg,.jpeg,.png')}>
						<Button icon={<UploadOutlined />}>Click to Upload</Button>
					</Upload>
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