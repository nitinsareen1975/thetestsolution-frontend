import React, { useState } from "react";
import { Col, Form, Input, Row, Button, DatePicker, TimePicker, Radio } from "antd";
import IntlMessages from "../../../services/intlMesseges";
import LabAPI from "../../../redux/api/lab-api";
const output = ({ ...props }) => {
	const [labs, setLabs] = useState([]);
	const [nextBtnVisible, setNextBtnVisible] = useState(false);
	const [scheduledDate, setScheduledDate] = useState(null);
	const [scheduledTime, setScheduledTime] = useState(null);
	const [zipFinder, setZipFinder] = useState(null);
	const findLab = async () => {
		var args = {
			filters: {},
			pagination: {},
			sorter: { column: "name", order: "asc" }
		}
		await LabAPI.getGlobalLabs(args).then(resp => {
			if (resp.status && resp.status === true) {
				setLabs(resp.data);
			}
		});
	}
	const onSelectLab = () => {
		setNextBtnVisible(true);
	}
	return <Form layout="vertical" onFinish={(values) => props.submitStep(values)} initialValues={props.data}>
		<h2 className="form-section-title">Schedule your appointment</h2>
		<Row gutter={15}>
			<Col xs={24} md={8}>
				<Form.Item name="scheduled_date" label="Date of Appointment" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
					<DatePicker placeholder="Date Of Appointment" onChange={(date) => setScheduledDate(date)} />
				</Form.Item>
			</Col>
			<Col xs={24} md={8}>
				<Form.Item name="scheduled_time" label="Time of Appointment" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
					<TimePicker use12Hours minuteStep={5} format="h:mm a" placeholder="Time Of Appointment" onChange={(time) => setScheduledTime(time)} />
				</Form.Item>
			</Col>
			<Col xs={24} md={8}>
				<Form.Item name="zip_finder" label="Zip Code" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
					<Input placeholder="Zip Code" onChange={(e) => setZipFinder(e.currentTarget.value)} />
				</Form.Item>
			</Col>
		</Row>
		{labs.length > 0 ?
			<Row style={{ marginBottom: 10 }}>
				<Col xs={24}>
					<Form.Item name="lab_assigned" label="Select a Lab" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
						<Radio.Group onChange={onSelectLab}>
							{labs.map(lab => {
								return <div className="lab-row" style={{ padding: 5 }}>
									<Radio key={lab.id} value={lab.id}>{lab.name} ({lab.street}, {lab.city}, {lab.state}, {lab.zip})</Radio>
								</div>
							})}
						</Radio.Group>
					</Form.Item>
				</Col>
			</Row>
			: ""}
		<Row gutter={15}>
			<Col xs={24}>
				<div className="steps-action">
					<Button onClick={props.parentPrev}>
						Previous
					</Button>
					<Button style={{ margin: '0 8px', opacity: (nextBtnVisible ? '1' : '0') }} type="primary" htmlType="submit">
						Next
					</Button>
					<Button style={{ margin: '0 8px', float: "right" }} type="primary" disabled={scheduledDate == null || scheduledTime == null || zipFinder == null} onClick={findLab}>
						Find Nearby Lab
					</Button>
				</div>
			</Col>
		</Row>
	</Form>
}
export default output;