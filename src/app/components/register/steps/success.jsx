import React, { useState } from "react";
import { Result, Button, message, Spin } from "antd";
import moment from "moment";
import Config from "../../../config";
import LabAPI from "../../../redux/api/lab-api";
import GlobalAPI from "../../../redux/api/global-api";
import { useEffect } from "react";
const output = ({ ...props }) => {
	const [labAssigned, setLabAssigned] = useState({});
	const [submitting, setSubmitting] = useState(false);
	var formdata = {};
	if (performance.getEntriesByType("navigation")[0].type == "navigate") {
		const params = new URLSearchParams(window.location.search.substring(1));
		const obj = {};
		for (const key of params.keys()) {
			if (params.getAll(key).length > 1) {
				obj[key] = params.getAll(key);
			} else {
				obj[key] = params.get(key);
			}
		}
		formdata = obj;
	}
	const resendEmail = async () => {
		setSubmitting(true);
		await GlobalAPI.resendConfirmationEmail(formdata.confirmation_code).then(resp => {
			if (resp.status && resp.status === true) {
				message.success("Email resent successfully.");
			}
			setSubmitting(false);
		});
	}

	useEffect(async () => {
		if (formdata.confirmation_code && formdata.confirmation_code != "") {
			await LabAPI.getGlobalLab(formdata.lab_assigned).then(resp => {
				if (resp.status && resp.status === true) {
					setLabAssigned(resp.data.name + ' (' + resp.data.city + ', ' + resp.data.state + ')');
				}
			});
		}
	}, []);
	let html = [];
	if (formdata.confirmation_code && formdata.confirmation_code != "") {
		html.push('"' + formdata.firstname + ' ' + formdata.lastname + '," Thank you for choosing Telestar Health. Your Covid-19 Test has been scheduled for ' + moment(formdata.scheduled_time).format("hh:mm A") + ' on ' + moment(formdata.scheduled_date).format("MM/DD/YYYY") + ', at our ' + labAssigned + ' location. In the next few minutes, you will be receiving an e-mail confirmation with the appointment information, name, address, confirmation code, and google maps link. If you do not receive the e-mail in your inbox within the next 3 minutes, please check your junk folder and/or select the email re-send link');
		html.push(<Button type="link" onClick={() => resendEmail()} style={{ padding: '0 3px', height: 'auto' }}>Click Here</Button>);
		html.push(".");
	}
	return <Spin spinning={submitting}>
		<Result
			status={(formdata.confirmation_code && formdata.confirmation_code != "") ? "success" : "error"}
			title={(formdata.confirmation_code && formdata.confirmation_code != "") ? "Thank you, your appointment is scheduled successfully!" : "Oops! Something went wrong."}
			subTitle={html}
			extra={[
				<Button onClick={() => window.location = Config.WEB_URL} type="primary" key="homebtn">
					Go to Homepage
				</Button>
			]}
		/>
	</Spin>
}
export default output;