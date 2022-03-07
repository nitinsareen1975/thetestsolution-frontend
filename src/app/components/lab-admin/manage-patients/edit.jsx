import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as adminActions from "../../../redux/actions/admin-actions";
import * as patientActions from "../../../redux/actions/patient-actions";
import { notifyUser } from "../../../services/notification-service";
import { Form, Button, Row, Col, Spin, Empty, Typography, message } from "antd";
import IntlMessages from "../../../services/intlMesseges";
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
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
import PatientAPI from "../../../redux/api/patient-api";
import Config from "../../../config";

class EditPatient extends React.Component {
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
    pricingArray: []
  };

  async componentDidMount() {
    var _countries = [];
    if (typeof this.props.countries === "undefined" || this.props.countries.length <= 0) {
      _countries = await this.props.getCountries();
    } else {
      _countries = this.props.countries;
    }
    var _patient = await this.props.getPatient(this.props.match.params.id);
    if (_patient.data.scheduled_date != null) {
      _patient.data.scheduled_date = moment(_patient.data.scheduled_date);
    }
    if (_patient.data.scheduled_time != null) {
      _patient.data.scheduled_time = moment(_patient.data.scheduled_time);
    }
    if (_patient.data.dob != null) {
      _patient.data.dob = moment(_patient.data.dob);
    }
    this.setState({
      loading: false,
      patient: (_patient.status == true) ? _patient.data : {},
      identifierDoc: (_patient.data.identifier_doc && _patient.data.identifier_doc != null) ? Config.DASHBOARD_URL + _patient.data.identifier_doc : this.state.identifier_doc,
      countries: _countries,
      pricingId: _patient.data.pricing_id,
      transactionId: _patient.data.transaction_id,
      dataLoaded: true
    });
  }

  handleSubmit = async (data) => {
    /* if (this.state.pricingId <= 0) {
      message.error("Please choose a pricing.");
      return false;
    }
    if (this.state.transactionId === null) {
      message.error("Payment transaction ID not found. Please make sure patient has made a payment.");
      return false;
    } */
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
      scheduled_time: moment(data.scheduled_time).format("YYYY-MM-DD HH:mm:ss"),
      state: data.state,
      street: data.street,
      test_type: data.test_type,
     /*  pricing_id: this.state.pricingId, */
      zip: data.zip,
      transaction_id: data.transaction_id ? data.transaction_id : UserService.getRandomString(24, data.email),
      confirmation_code: UserService.getRandomString(24, data.email)
    };
    var historyState = this.props.history.location.state;
    if(typeof historyState !== "undefined" && typeof historyState.showCheckIn !== "undefined" && historyState.showCheckIn === true){
      var patients_statuses = this.props.patient_status_list;
      if (patients_statuses.length > 0) {
        var statusObj = patients_statuses.find(i => i.code == 'checked-in');
        args['progress_status'] = statusObj.id;
      }
    }
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
    await this.props.updatePatient(this.props.match.params.id, args).then((response) => {
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

  removeIdentifierDocInline = async() => {
    await PatientAPI.removeIdentifierDoc('patient-identifier-doc', this.props.match.params.id).then((response) => {
      if (response.status && response.status === true) {
        this.setState({ identifierDoc: null, identifierDocRemoved: true });
      }
    });
  }

  setIdentifierDocUpload = (data) => {
    this.setState({ identifierDocUpload: data });
  }

  onChangeFormFieldValue = (key, value) => {
    this.formRef.current.setFieldsValue({[key]: value});
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

  render() {
    var historyState = this.props.history.location.state;
    var showCheckinBtn = false;
    if(typeof historyState !== "undefined" && typeof historyState.showCheckIn !== "undefined" && historyState.showCheckIn === true){
      showCheckinBtn = true;
    }
    return (
      <div>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Typography.Title level={4}>Edit Patient</Typography.Title>
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
          {this.state.patient.id ?
            <Form ref={this.formRef} layout="vertical" onFinish={this.handleSubmit} initialValues={this.state.patient}>
              <ContactInfo />
              <PersonalInfo />
              <HomeAddressInfo countries={this.state.countries} />
              <SymptomsInfo data={this.state.patient}/>
              <Identification removeIdentifierDocInline={this.removeIdentifierDocInline} identifier_doc={this.state.identifierDoc} countries={this.state.countries} setIdentifierDocUpload={this.setIdentifierDocUpload}/>
              <TestType data={this.state.patient} changeFormFieldValue={this.onChangeFormFieldValue} setPricingId={this.setPricingId} setPricingArray={this.setPricingArray} setLoading={this.setLoading}/>
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
                      {showCheckinBtn ? "Update and Checkin" : <IntlMessages id="admin.userlisting.update" />}
                      <SaveOutlined />
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
  return bindActionCreators({ ...patientActions, ...adminActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    EditPatient
  )
);
