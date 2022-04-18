import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as adminActions from "../../../redux/actions/admin-actions";
import * as patientActions from "../../../redux/actions/patient-actions";
import * as GroupConciergeActions from "../../../redux/actions/group-concierge-actions";
import { notifyUser } from "../../../services/notification-service";
import { Form, Button, Row, Col, Spin, Typography, message } from "antd";
import IntlMessages from "../../../services/intlMesseges";
import { PlusCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import ContactInfo from "./manage-patients-information/contact-info.jsx";
import HomeAddressInfo from "./manage-patients-information/home-address.jsx";
import PersonalInfo from "./manage-patients-information/personal-info.jsx";
import SymptomsInfo from "./manage-patients-information/symptoms-info.jsx";
import Identification from "./manage-patients-information/identification.jsx";
import TestType from "./manage-patients-information/test.jsx";
import PaymentInfo from "./manage-patients-information/payment.jsx";
import * as UserService from "../../../services/user-service";
import moment from "moment";
import GlobalAPI from "../../../redux/api/global-api";

class AddGroupPatient extends React.Component {
	formRef = React.createRef();
	state = {
		loading: true,
		countries: [],
		dataLoaded: false,
		identifierDoc: null,
		pricingId: 0,
		transactionId: null,
		patient: {},
		pricingArray: [],
		formdata: [],
		labAssigned: 0,
    groupAssigned: 0
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
		if (this.state.labAssigned <= 0 || this.state.groupAssigned <= 0) {
      message.error("Please choose an event.");
      return false;
    }
		/* if (this.state.pricingId <= 0) {
			message.error("Please choose a pricing.");
			return false;
		}
		if (this.state.transactionId === null) {
			message.error("Payment transaction ID not found. Please make sure patient has made a payment.");
			return false;
		} */
		
		var args = {
      group_id: this.state.groupAssigned,
			city: data.city,
			country: data.country,
			dob: moment(data.dob, 'MM/DD/YYYY').format("YYYY-MM-DD"),
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
			lab_assigned: this.state.labAssigned,
			lastname: data.lastname,
			middlename: data.middlename,
			phone: data.phone,
			race: data.race,
			scheduled_date: moment(data.scheduled_date, 'MM/DD/YYYY').isValid() ? moment(data.scheduled_date, 'MM/DD/YYYY').format("YYYY-MM-DD") : null,
			scheduled_time: moment(data.scheduled_time).format("YYYY-MM-DD HH:mm:ss"),
			state: data.state,
			street: data.street,
			street2: data.street2,
			test_type: data.test_type,
			zip: data.zip,
			pricing_id: data.pricing_id,
			transaction_id: "group_payment",
			payment_provider: data.payment_provider,
			is_lab_collected: 1,
      progress_status: "1",
			ssn: data.ssn,
			FirstTestForCondition: data.FirstTestForCondition,
			EmployedInHealthCare: data.EmployedInHealthCare,
			Symptomatic: data.Symptomatic,
			DateOfSymptomOnset: moment(data.DateOfSymptomOnset, 'MM/DD/YYYY').isValid() ? moment(data.DateOfSymptomOnset, 'MM/DD/YYYY').format("YYYY-MM-DD") : null,
			pregnent: data.pregnent,
			confirmation_code: UserService.getRandomString(24, data.email)
		};
		if (typeof data.identifier_doc !== "undefined" && typeof data.identifier_doc.file !== "undefined" && data.identifier_doc.file !== null && typeof data.identifier_doc.file !== "string" && data.identifier_doc.file.name) {
			const formData = new FormData();
			formData.append('identifier_doc', data.identifier_doc.file);
			await GlobalAPI.uploadIdentifierDoc('patient-identifier-doc', formData).then((response) => {
				if (response.status && response.status === true) {
					args['identifier_doc'] = response.data;
				}
			});
		}
		this.setState({ loading: true });
		await this.props.addGroupPatient(args).then((response) => {
			if (response.status && response.status === true) {
				notifyUser(response.message, "success");
				this.setState({ loading: false });
				this.props.history.push("./group-patients");
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

	onChangeFormFieldValue = (key, value) => {
		this.formRef.current.setFieldsValue({ [key]: value });
	}

	setPricingId = (pricing) => {
		this.setState({ pricingId: pricing });
	}

	setTransactionId = (id) => {
		this.setState({ transactionId: id });
	}

	setPricingArray = (data) => {
		this.setState({ pricingArray: data });
	}

	onValuesChange = (changedFields, allFields) => {
		this.setState({ formdata: allFields })
	}

	setLoading = (value) => {
		this.setState({ loading: value });
	}

	render() {
		return (
			<div>
				<Row gutter={24}>
					<Col xs={24} sm={24} md={12} lg={12} xl={12}>
						<Typography.Title level={4}>Add Group Patient</Typography.Title>
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
					<Form ref={this.formRef} layout="vertical" onFinish={this.handleSubmit} onValuesChange={this.onValuesChange}>
						<ContactInfo />
						<PersonalInfo />
						<HomeAddressInfo countries={this.state.countries} />
						{/* <SymptomsInfo data={[]} /> */}
						<Identification removeIdentifierDocInline={() => { }} identifier_doc={this.state.identifierDoc} countries={this.state.countries} setIdentifierDocUpload={() => { }} />
						<TestType data={this.state.patient} changeFormFieldValue={this.onChangeFormFieldValue} setPricingId={this.setPricingId} setPricingArray={this.setPricingArray} setLoading={this.setLoading} setGroupAssigned={(event_id) => this.setState({groupAssigned: event_id })} setLabAssigned={(lab_id) => this.setState({labAssigned: lab_id })}/>
						{/* <PaymentInfo paymentDone={false} data={this.state.formdata} setTransactionId={this.setTransactionId} pricingId={this.state.pricingId} pricingArray={this.state.pricingArray} onSubmit={this.handleSubmit} setLoading={this.setLoading}/> */}
						{/* <Row>
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
						</Row> */}
						<Row gutter={15}>
							<div className="steps-action">
								<Button
									type="primary"
									style={{ display: "inline-block", marginLeft: "8px" }}
									className="def-blue"
									htmlType="submit"
									size="large"
								>
									<IntlMessages id="admin.userlisting.add" />
									<PlusCircleOutlined />
								</Button>
							</div>
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
	return bindActionCreators({ ...patientActions, ...adminActions, ...GroupConciergeActions }, dispatch);
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
		AddGroupPatient
	)
);
