import React, {useState} from "react";
import { Result, Button, message, Spin } from "antd";
import moment from "moment";
import Config from "../../../config";
import LabAPI from "../../../redux/api/lab-api";
import GlobalAPI from "../../../redux/api/global-api";
import { useEffect } from "react";
const output = ({...props}) => {
	const [labAssigned, setLabAssigned] = useState({});
	const [submitting, setSubmitting] = useState(false);

	const resendEmail = async() => {
		setSubmitting(true);
		await GlobalAPI.resendConfirmationEmail(props.formdata.confirmation_code).then(resp => {
			if (resp.status && resp.status === true) {
				message.success("Email resent successfully.");
			}
			setSubmitting(false);
		});
	}

	useEffect(async() => {
		await LabAPI.getGlobalLab(props.formdata.lab_assigned).then(resp => {
			if (resp.status && resp.status === true) {
				setLabAssigned(resp.data.name+' ('+resp.data.city+', '+resp.data.state+')');
			}
		});
	},[]);

	let html = [];
    html.push('"'+props.formdata.firstname+' '+props.formdata.lastname+'," Thank you for choosing Telestar Health. Your Covid-19 Test has been scheduled for '+ moment(props.formdata.scheduled_time).format("hh:mm A")+' on '+moment(props.formdata.scheduled_date).format("MM/DD/YYYY")+', at our '+labAssigned+' location. In the next few minutes, you will be receiving an e-mail confirmation with the appointment information, name, address, confirmation code, and google maps link. If you do not receive the e-mail in your inbox within the next 3 minutes, please check your junk folder and/or select the email re-send link');
	html.push(<Button type="link" onClick={() => resendEmail()} style={{ padding: '0 3px', height: 'auto'}}>Click Here</Button>);
	html.push(".");
	return <Spin spinning={submitting}>
		<Result
			status="success"
			title="Thank you, your appointment is scheduled successfully!"
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