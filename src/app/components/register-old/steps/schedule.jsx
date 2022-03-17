import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Input, Row, Button, DatePicker, TimePicker, Radio, message, Spin } from "antd";
import IntlMessages from "../../../services/intlMesseges";
import LabAPI from "../../../redux/api/lab-api";
import Config from "../../../config";
import Axios from "axios";
import moment from "moment";
const output = ({ ...props }) => {
	const formRef = useRef();
	const [labs, setLabs] = useState([]);
	const [nextBtnVisible, setNextBtnVisible] = useState(false);
	const [nearByText, setNearByText] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const findLab = async () => {
		var scheduledDate = formRef.current.getFieldValue('scheduled_date');
		var scheduledTime = formRef.current.getFieldValue('scheduled_time');
		var zipFinder = formRef.current.getFieldValue('zip_finder');
		if (scheduledDate == null || scheduledTime == null || zipFinder == null) {
			message.error('Please fill in all the required fields.');
			return;
		}
		setSubmitting(true);
		var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipFinder + "&key=" + Config.GoogleMapsAPIkey;
		await Axios.get(geocodeUrl).then(async (response) => {
			var latlng = {};
			var args = {
				filters: {},
				pagination: {},
				sorter: { column: "name", order: "asc" }
			}
			if (response.data && response.data.results && response.data.results.length > 0) {
				latlng = response.data.results[0].geometry.location;
				args.filters = {
					lat: latlng.lat,
					lng: latlng.lng
				}
			}
			await LabAPI.getGlobalLabs(args).then(resp => {
				if (resp.status && resp.status === true) {
					if (typeof resp.type !== "undefined" && resp.type == "nearby") {
						setNearByText("");
					} else {
						setNearByText("No nearby labs were found. Please try to modify your search or choose one lab from the list below according to your convenience.");
					}
					setLabs(resp.data);
					setSubmitting(false);
				}
			});
		}).catch(e => {
			message.error('Unexpected error occured. Please contact support.');
			setSubmitting(false);
		});
	}
	const onSelectLab = () => {
		setNextBtnVisible(true);
	}
	useEffect(() => {
		var lab_assigned = formRef.current.getFieldValue('lab_assigned');
		if (typeof lab_assigned !== "undefined" && lab_assigned !== null && parseInt(lab_assigned) > 0) {
			setNextBtnVisible(true);
		}
	}, []);
	return <Spin spinning={submitting}>
		<Form ref={formRef} layout="vertical" onFinish={(values) => props.submitStep(values)} initialValues={props.data}>
			<h2 className="form-section-title">Schedule your appointment</h2>
			<Row gutter={15}>
				<Col xs={24} md={8}>
					<Form.Item name="scheduled_date" label="Date of Appointment" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
						<DatePicker placeholder="Date Of Appointment"  disabledDate={(current) => moment()  >= current} />
					</Form.Item>
				</Col>
				<Col xs={24} md={8}>
					<Form.Item name="scheduled_time" label="Time of Appointment" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
						<TimePicker use12Hours disabledHours={() => [21, 22, 23, 24, 1, 2, 3, 4, 5, 6, 7]} minuteStep={5} format="h:mm a" placeholder="Time Of Appointment" />
					</Form.Item>
				</Col>
				<Col xs={24} md={8}>
					<Form.Item name="zip_finder" label="Zip Code" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
						<Input placeholder="Zip Code" />
					</Form.Item>
				</Col>
			</Row>
			{labs.length > 0 ?
				<Row style={{ marginBottom: 10 }}>
					<Col xs={24}>
						<label style={{ color: "#cb0019" }}>{nearByText}</label>
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
						<Button style={{ margin: '0 8px', opacity: (nextBtnVisible === true) ? 1 : 0 }} type="primary" htmlType="submit">
							Next
						</Button>
						<Button style={{ margin: '0 8px', float: "right" }} type="primary" onClick={findLab}>
							Find Nearby Lab
						</Button>
					</div>
				</Col>
			</Row>
		</Form>
	</Spin>
}
export default output;