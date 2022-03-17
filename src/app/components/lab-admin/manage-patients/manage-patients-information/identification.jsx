import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, Typography, Upload } from "antd";
import { UploadOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import IntlMessages from "../../../../services/intlMesseges";
import { notifyUser } from "../../../../services/notification-service";
import { FormattedHTMLMessage } from "react-intl";
const { Option } = Select;
const output = ({ ...props }) => {
	const uploaderProps = (field, accept) => {
		return {
			showUploadList: true,
			accept: accept,
			multiple: false,
			beforeUpload: file => {
				if (file.type.indexOf('image/') === -1) {
					notifyUser(<IntlMessages id="admin.fileupload.acceptedtypes" />, "error");
					props.setIdentifierDocUpload(null);
				} else {
					props.setIdentifierDocUpload(file);
				}
				return false;
			},
			onRemove: _file => {
				props.setIdentifierDocUpload(null);
			},
			onSuccess: _res => {
				props.setIdentifierDocUpload(null);
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
				<Typography.Title level={5}>Identification</Typography.Title>
			</Col>
		</Row>
		<hr />
		<Row gutter={15}>
			<Col xs={24} sm={24} md={12} lg={6} xl={6}>
				<Form.Item name="identifier_type" label="ID Type" >
					<Select placeholder="ID Type">
						<Select.Option value="Driver License">Driver License</Select.Option>
						<Select.Option value="Passport">Passport</Select.Option>
					</Select>
				</Form.Item>
			</Col>
			<Col xs={24} sm={24} md={12} lg={6} xl={6}>
				<Form.Item name="identifier" label="ID Number" >
					<Input placeholder="ID Number" />
				</Form.Item>
			</Col>
			<Col xs={24} sm={24} md={12} lg={6} xl={6}>
				<Form.Item name="identifier_country" label="ID Country" >
					<Select
						showSearch
						filterOption={(input, option) =>
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						{_countries.map(function (item) {
							return (
								<Option key={item.id.toString()} value={item.id.toString()}>
									{item.name}
								</Option>
							);
						})}
					</Select>
				</Form.Item>
			</Col>
			<Col xs={24} sm={24} md={12} lg={6} xl={6}>
				<Form.Item name="identifier_doc" label="Select identification image to upload:">
					<Upload {...uploaderProps('identifier_doc', '.jpg,.jpeg,.png')}>
						<Button icon={<UploadOutlined />}>Click to Upload</Button>
					</Upload>
					{props.identifier_doc && props.identifier_doc !== null && props.identifier_doc !== "" && typeof props.identifier_doc === "string" ?
						<span>
							<img src={props.identifier_doc} style={{ maxWidth: 100 }} />
							<Button type="link" onClick={() => window.open(props.identifier_doc,"_blank")}><DownloadOutlined /></Button>
							<Button type="link" onClick={() => props.removeIdentifierDocInline()}><DeleteOutlined /></Button>
						</span>
						: ""}
				</Form.Item>
			</Col>
		</Row>
	</div>
}
export default output;