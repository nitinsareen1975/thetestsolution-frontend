import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as adminActions from "../../../redux/actions/admin-actions";
import * as patientActions from "../../../redux/actions/patient-actions";
import { notifyUser } from "../../../services/notification-service";
import { Form, Button, Row, Col, Spin, Typography } from "antd";
import IntlMessages from "../../../services/intlMesseges";
import { PlusCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import ContactInfo from "../manage-patients/manage-patients-information/contact-info.jsx";
import HomeAddressInfo from "../manage-patients/manage-patients-information/home-address.jsx";
import PersonalInfo from "../manage-patients/manage-patients-information/personal-info.jsx";
import SymptomsInfo from "../manage-patients/manage-patients-information/symptoms-info.jsx";
import Identification from "../manage-patients/manage-patients-information/identification.jsx";
import TestType from "../manage-patients/manage-patients-information/test.jsx";
import PaymentInfo from "../manage-patients/manage-patients-information/payment.jsx";
import * as UserService from "../../../services/user-service";
import moment from "moment";
import GlobalAPI from "../../../redux/api/global-api";

class AddPatient extends React.Component {
	state = {
		loading: true,
		countries: [],
		dataLoaded: false,
		identifierDoc: null
	};

	async componentDidMount() {
		var _countries = [];
		if (typeof this.props.countries === "undefined" || this.props.countries.length <= 0) {
			_countries = await this.props.getCountries();
		} else {
			_countries = this.props.countries;
		}
		this.setState({
			loading: false,
			countries: _countries,
			dataLoaded: true
		});
	}

	handleSubmit = async (data) => {
		var lab = JSON.parse(localStorage.getItem("lab"));
		var args = {
			city: data.city,
			country: data.country,
			dob: moment(data.dob).format("YYYY-MM-DD"),
			email: data.email,
			ethnicity: data.ethnicity,
			firstname: data.firstname,
			gender: data.gender,
			have_any_symptom: data.have_any_symptom,
			have_breath_shortness: data.have_breath_shortness,
			have_cough: data.have_cough,
			have_decreased_taste: data.have_decreased_taste,
			have_fever: data.have_fever,
			have_muscle_pain: data.have_muscle_pain,
			have_sore_throat: data.have_sore_throat,
			have_vaccinated: data.have_vaccinated,
			identifier: data.identifier,
			identifier_country: data.identifier_country,
			identifier_doc: "",
			identifier_type: data.identifier_type,
			lab_assigned: lab.id,
			lastname: data.lastname,
			middlename: data.middlename,
			phone: data.phone,
			race: data.race,
			scheduled_date: moment(data.scheduled_date).format("YYYY-MM-DD"),
			scheduled_time: moment(data.scheduled_time).format("YYYY-MM-DD"),
			state: data.state,
			street: data.street,
			test_type: data.test_type,
			zip: data.zip,
			transaction_id: data.transaction_id ? data.transaction_id : UserService.getRandomString(24, data.email),
			confirmation_code: UserService.getRandomString(24, data.email)
		};
		if (typeof data.identifier_doc.file !== "undefined" && data.identifier_doc.file !== null && typeof data.identifier_doc.file !== "string" && data.identifier_doc.file.name) {
			const formData = new FormData();
			formData.append('identifier_doc', data.identifier_doc.file);
			await GlobalAPI.uploadIdentifierDoc('patient-identifier-doc', formData).then((response) => {
				if (response.status && response.status === true) {
					args['identifier_doc'] = response.data;
				}
			});
		}
		this.setState({ loading: true });
		await this.props.addPatient(args).then((response) => {
			if (response.status && response.status === true) {
				notifyUser(response.message, "success");
				this.setState({ loading: false });
				this.props.history.push("../patients");
			} else {
				if (response.message) {
					notifyUser(response.message, "error");
				} else {
					notifyUser("Unknown error. Please try again!", "error");
				}
				this.setState({ loading: false });
			}
		})
			.catch((err) => {
				this.setState({ loading: false });
			});
	};

	render() {
		return (
			<div>
				<Row gutter={24}>
					<Col xs={24} sm={24} md={12} lg={12} xl={12}>
						<Typography.Title level={4}>Add Patient</Typography.Title>
					</Col>

					<Col
						xs={24}
						sm={24}
						md={12}
						lg={12}
						xl={12}
						style={{ textAlign: "right" }}
					>
						<Button
							type="primary"
							className=""
							htmlType="button"
							onClick={() => this.props.history.goBack()}
						>
							<ArrowLeftOutlined />
							<IntlMessages id="admin.userlisting.back" />
						</Button>
					</Col>
				</Row>
				<hr /><br />
				<Spin spinning={this.state.loading}>
					<Form layout="vertical" onFinish={this.handleSubmit}>
						<ContactInfo />
						<PersonalInfo />
						<HomeAddressInfo countries={this.state.countries} />
						<SymptomsInfo data={[]} />
						<Identification removeIdentifierDocInline={() => { }} identifier_doc={this.state.identifierDoc} countries={this.state.countries} setIdentifierDocUpload={() => { }} />
						<TestType />
						<PaymentInfo />
						<Row>
							<Col>
								<Form.Item>
									<Button
										type="primary"
										style={{ display: "inline-block", marginRight: "10px" }}
										className="def-blue"
										htmlType="submit"
										size="large"
									>
										<IntlMessages id="admin.userlisting.add" />
										<PlusCircleOutlined />
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Spin>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { ...state.userConfig, ...state.countries, ...state.adminConfig };
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ ...patientActions, ...adminActions }, dispatch);
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
		AddPatient
	)
);
