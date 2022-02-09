import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, Typography, Upload } from "antd";
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
	return <div>
		<Row gutter={24}>
			<Col xs={24} sm={24}>
				<Typography.Title level={4}>Identification</Typography.Title>
			</Col>
		</Row>
		<hr />
		<Row gutter={15}>
			<Col xs={24} sm={24} md={12} lg={6} xl={6}>
				<Form.Item name="identifier_type" label="ID Type" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
					<Select placeholder="ID Type">
						<Select.Option value="Driver License">Driver License</Select.Option>
						<Select.Option value="Passport">Passport</Select.Option>
					</Select>
				</Form.Item>
			</Col>
			<Col xs={24} sm={24} md={12} lg={6} xl={6}>
				<Form.Item name="identifier" label="ID Number" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
					<Input placeholder="ID Number" />
				</Form.Item>
			</Col>
			<Col xs={24} sm={24} md={12} lg={6} xl={6}>
				<Form.Item name="identifier_country" label="ID Country" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
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
			<Col xs={24} sm={24} md={12} lg={6} xl={6}>
				<Form.Item name="identifier_doc" label="Select identification image to upload:" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
					<Upload {...uploaderProps('identifier_doc', '.jpg,.jpeg,.png')}>
						<Button icon={<UploadOutlined />}>Click to Upload</Button>
					</Upload>
				</Form.Item>
			</Col>
		</Row>
	</div>
}
export default output;