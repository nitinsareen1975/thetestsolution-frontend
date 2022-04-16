import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as adminActions from "../../../redux/actions/admin-actions";
import * as patientActions from "../../../redux/actions/patient-actions";
import * as GroupConciergeActions from "../../../redux/actions/group-concierge-actions";
import { notifyUser } from "../../../services/notification-service";
import { Form, Button, Row, Col, Spin, Empty, Typography, message } from "antd";
import IntlMessages from "../../../services/intlMesseges";
import { ArrowLeftOutlined, SaveOutlined, CheckCircleOutlined } from '@ant-design/icons';
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
import PatientAPI from "../../../redux/api/patient-api";
import Config from "../../../config";

class EditGroupPatient extends React.Component {
  formRef = React.createRef();
  state = {
    loading: true,
    countries: [],
    patient: {},
    identifierDocRemoved: false,
    identifierDoc: null,
    identifierDocUpload: null,
    dataLoaded: false,
    pricingId: 0,
    transactionId: null,
    pricingArray: [],
    labAssigned: 0,
    groupAssigned: 0
  };

  async componentDidMount() {

    var _patient = await this.props.getGroupPatient(this.props.match.params.id);
    if (_patient.data.scheduled_date != null) {
      _patient.data.scheduled_date = moment(_patient.data.scheduled_date);
    }
    if (_patient.data.scheduled_time != null) {
      _patient.data.scheduled_time = moment(_patient.data.scheduled_time);
    }
    if (_patient.data.dob != null) {
      _patient.data.dob = moment(_patient.data.dob);
    }
    if (_patient.data.DateOfSymptomOnset != null) {
      _patient.data.DateOfSymptomOnset = moment(_patient.data.DateOfSymptomOnset);
    }
    var _countries = [];
    if (typeof this.props.countries === "undefined" || this.props.countries.length <= 0) {
      _countries = await this.props.getCountries();
    } else {
      _countries = this.props.countries;
    }
    this.setState({
      loading: false,
      patient: (_patient.status == true) ? _patient.data : {},
      identifierDoc: (_patient.data.identifier_doc && _patient.data.identifier_doc != null) ? Config.DASHBOARD_URL + _patient.data.identifier_doc : "",
      countries: _countries,
      pricingId: _patient.data.pricing_id,
      transactionId: _patient.data.transaction_id,
      labAssigned: _patient.data.lab_assigned,
      groupAssigned: _patient.data.group_id,
      dataLoaded: true
    });
  }

  handleSubmit = async (data) => {
    console.log("St:", this.state)
    if (this.state.labAssigned <= 0 || this.state.groupAssigned <= 0) {
      message.error("Please choose an event.");
      return false;
    }
    /* if (this.state.transactionId === null) {
      message.error("Payment transaction ID not found. Please make sure patient has made a payment.");
      return false;
    } */
    var args = {
      group_id: this.state.groupAssigned,
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
      lab_assigned: this.state.labAssigned,
      lastname: data.lastname,
      middlename: data.middlename,
      phone: data.phone,
      race: data.race,
      scheduled_date: moment(data.scheduled_date).format("YYYY-MM-DD"),
      scheduled_time: moment(data.scheduled_time).format("YYYY-MM-DD HH:mm:ss"),
      state: data.state,
      street: data.street,
      street2: data.street2,
      test_type: data.test_type,
      pricing_id: this.state.pricingId,
      zip: data.zip,
      transaction_id: data.transaction_id ? data.transaction_id : this.state.patient.transaction_id,
      confirmation_code: data.confirmation_code,
      is_lab_collected: this.state.patient.is_lab_collected,
      ssn: data.ssn,
			FirstTestForCondition: data.FirstTestForCondition,
			EmployedInHealthCare: data.EmployedInHealthCare,
			Symptomatic: data.Symptomatic,
			DateOfSymptomOnset: moment(data.DateOfSymptomOnset).format("YYYY-MM-DD"),
      pregnent: data.pregnent,
      progress_status: data.progress_status
    };
    if (typeof this.state.identifierDocUpload !== "undefined" && this.state.identifierDocUpload !== null && typeof this.state.identifierDocUpload !== "string" && this.state.identifierDocUpload.name) {
      const formData = new FormData();
      formData.append('identifier_doc', this.state.identifierDocUpload);
      await GlobalAPI.uploadIdentifierDoc('patient-identifier-doc', formData).then((response) => {
        if (response.status && response.status === true) {
          args['identifier_doc'] = response.data;
        }
      });
    }
    if (this.state.identifierDocRemoved === true) {
      args['identifier_doc'] = "";
    }
    this.setState({ loading: true });
    await this.props.updateGroupPatient(this.props.match.params.id, args).then((response) => {
      if (response.status && response.status === true) {
        notifyUser(response.message, "success");
        this.setState({ loading: false });
        this.props.history.goBack();
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

  removeIdentifierDocInline = async () => {
    await PatientAPI.removeIdentifierDoc('group-patient-identifier-doc', this.props.match.params.id).then((response) => {
      if (response.status && response.status === true) {
        this.setState({ identifierDoc: null, identifierDocRemoved: true });
      }
    });
  }

  setIdentifierDocUpload = (data) => {
    this.setState({ identifierDocUpload: data });
  }

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

  setLoading = (value) => {
    this.setState({ loading: value });
  }

  completeRegistration = async() => {
    this.setState({ loading: true });
    var formValues = this.formRef.current.getFieldsValue();
    await this.props.saveAndCompleteRegistration(this.props.match.params.id, this.state.groupAssigned, formValues);
    notifyUser("Updated successfully.", "success");
    this.props.history.goBack();
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Typography.Title level={4}>Edit Group Patient</Typography.Title>
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
          {this.state.patient.id && this.state.countries.length > 0 ?
            <Form ref={this.formRef} layout="vertical" onFinish={this.handleSubmit} initialValues={this.state.patient}>
              <ContactInfo />
              <PersonalInfo />
              <HomeAddressInfo countries={this.state.countries} />
              {/* <SymptomsInfo data={this.state.patient}/> */}
              <Identification removeIdentifierDocInline={this.removeIdentifierDocInline} identifier_doc={this.state.identifierDoc} countries={this.state.countries} setIdentifierDocUpload={this.setIdentifierDocUpload} />
              <TestType data={this.state.patient} changeFormFieldValue={this.onChangeFormFieldValue} setPricingId={this.setPricingId} setPricingArray={this.setPricingArray} setLoading={this.setLoading} setGroupAssigned={(event_id) => this.setState({ groupAssigned: event_id })} setLabAssigned={(lab_id) => this.setState({ labAssigned: lab_id })} />
              {/* <PaymentInfo data={this.state.patient} paymentDone={this.state.patient && this.state.patient.transaction_id !== null && this.state.patient.transaction_id !== "" ? true : false} setTransactionId={this.setTransactionId} pricingArray={this.state.pricingArray} setLoading={this.setLoading} pricingId={this.state.pricingId}/> */}
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
                      <IntlMessages id="admin.userlisting.update" />
                      <SaveOutlined />
                    </Button>
                    <Button
                      type="default"
                      style={{ display: "inline-block", marginRight: "10px" }}
                      className="def-blue"
                      size="large"
                      onClick={this.completeRegistration}
                    >
                      Update and Complete Registration
                      <CheckCircleOutlined />
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            : <Empty />}
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
    EditGroupPatient
  )
);
