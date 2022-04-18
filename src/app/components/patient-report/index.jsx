import React from "react";
import { Row, Col, Spin, Form, Button, DatePicker } from 'antd';
import logo from "../../assets/images/logo.png";
import { useState, useEffect } from "react";
import { notifyUser } from "../../services/notification-service";
import PatientAPI from "../../redux/api/patient-api";
import moment from "moment";

import CryptoAES from 'crypto-js/aes';


const output = ({...props}) => {
	const [submitted, setSubmitted] = useState(false);
	const handleSubmit = async(values) => {
		if(typeof values.dob === "undefined" || values.dob == ""){
			notifyUser("Please select your date of brth to proceed.", "error");
		} else {
			setSubmitted(true);
			let dob = moment(values.dob).format("YYYY-MM-DD");
			await PatientAPI.validateDOB({dob: dob, patientId: props.match.params.patientId}).then(resp => {
				if(resp.status && resp.status === true){
					props.history.push("./"+props.match.params.patientId+'/'+resp.confirmationCode);
				} else {
					if(resp.message){
						notifyUser(resp.message, "error");
					} else {
						notifyUser("User not found.", "error");
					}
				}
				setSubmitted(false);
			}).catch(() => {
				setSubmitted(false);
			});
		}
	}

	/* useEffect(() => {
		let enc = CryptoAES.encrypt('my message', 'secret key 123');
		console.log("enc1::", enc.toString());
		return {};
	},[]); */

	return <div className="reportwrap">
		<Spin size="large" spinning={submitted}>
			<Row gutter={24} className="login" style={{ maxWidth: 420, margin: '0 auto'}}>
				<Col xs={24} lg={24}>
					<div className="form-column">
						<div className="form-column-inner">
							<div className="logo">
								<img src={logo} alt="Logo" style={{ maxWidth: 200}} />
							</div>
							<hr className="title-hr" /><br/>
							<Form layout="vertical" onFinish={(values) => handleSubmit(values)}>
								<Form.Item name="dob" label="Enter your Date of Birth to view report">
									<DatePicker />
								</Form.Item>
								<Row>
									<Col xs={24}>
										<Button type="primary" htmlType="submit" size={'large'}>Submit</Button>
									</Col>
								</Row>
							</Form>
						</div>
					</div>
				</Col>
			</Row>
		</Spin >
	</div >;
}
export default output;