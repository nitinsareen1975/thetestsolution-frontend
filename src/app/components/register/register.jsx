import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import logo from "../../assets/images/logo.png";
import { notifyUser } from "../../services/notification-service";
import * as UserActions from "../../redux/actions/user-actions";
import * as adminActions from "../../redux/actions/admin-actions";
import * as patientActions from "../../redux/actions/patient-actions";
import GlobalAPI from "../../redux/api/global-api";
import { Button, Col, Form, Row, Spin, Steps } from "antd";
import { UserOutlined, SolutionOutlined, CreditCardOutlined, SmileOutlined, ScheduleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import PersonalInformation from "./steps/personal-information.jsx";
import moment from "moment";
import Schedule from "./steps/schedule.jsx";
import Payment from "./steps/payment.jsx";
import Success from "./steps/success.jsx";
import TeleHeader from "./header-footer/header.jsx";
import TeleFooter from "./header-footer/footer.jsx";
import * as UserService from "../../services/user-service";
import Config from "../../config";
const { Step } = Steps;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      steps: [
        {
          title: "Schedule Appointment",
          icon: <ScheduleOutlined />,
          content: Schedule,
        },
        {
          title: "Contact Information",
          icon: <InfoCircleOutlined />,
          content: PersonalInformation,
        },
        {
          title: "Payment Details",
          icon: <CreditCardOutlined />,
          content: Payment,
        }
      ],
      submitted: false,
      data: [],
      countries: [],
      paymentDone: false,
      selectedLabName: "Florida"
    };
  }

  async componentDidMount() {
    var _countries = [];
    if (typeof this.props.countries === "undefined" || this.props.countries.length <= 0) {
      _countries = await this.props.getCountries();
    } else {
      _countries = this.props.countries;
    }
    this.setState({ countries: _countries });
  }

  submitStep = (data) => {
    var mergedData = { ...data, ...this.state.data };
    this.setState({
      data: mergedData
    }, () => {
      this.gotoNextStep();
    });
  };

  handleSubmit = async (values) => {
    var data = { ...values, ...this.state.data };
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
      identifier_state: data.identifier_state,
      identifier_country: data.identifier_country,
      identifier_doc: "",
      identifier_type: data.identifier_type,
      lab_assigned: data.lab_assigned,
      lastname: data.lastname,
      middlename: data.middlename,
      phone: data.phone,
      race: data.race,
      scheduled_date: moment(data.scheduled_date).format("YYYY-MM-DD"),
      scheduled_time: moment(data.scheduled_time).format("YYYY-MM-DD HH:mm:ss"),
      state: data.state,
      street: data.street,
      pricing_id: data.pricing_id,
      zip: data.zip,
      transaction_id: data.transaction_id,
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
    var self = this;
    this.setState({ submitted: true });
    await this.props.registerPatient(args).then((response) => {
      if (response.status && response.status === true) {
        notifyUser(response.message, "success");
        this.setState({
          data: { ...args, ...this.state.data },
        }, () => {
          var historyArgs = {
            confirmation_code: self.state.data.confirmation_code,
            lab_assigned: self.state.selectedLabName,
            firstname: self.state.data.firstname,
            lastname: self.state.data.lastname,
            scheduled_time: moment(self.state.data.scheduled_time).format("MM/DD/YYYY"),
            scheduled_date: moment(self.state.data.scheduled_date).format("hh:mm A")
          }
          var qstr = [];
          for (var p in historyArgs){
            if (historyArgs.hasOwnProperty(p)) {
              qstr.push(encodeURIComponent(p) + "=" + encodeURIComponent(historyArgs[p]));
            }
          }
          //self.props.history.push("/thank-you?"+qstr.join("&"));
          window.location = Config.WEB_URL+"thank-you?"+qstr.join("&");
        });
      } else {
        if (response.message) {
          notifyUser(response.message, "error");
        } else {
          notifyUser("Unknown error. Please try again!", "error");
        }
        this.setState({ submitted: false });
      }
    })
      .catch((err) => {
        this.setState({ submitted: false });
      });
  };

  gotoNextStep = () => {
    var _current = this.state.current;
    this.setState({ current: _current + 1 });
  };

  gotoPreviousStep = () => {
    var _current = this.state.current;
    this.setState({ current: _current - 1 });
  };

  saveSelectedLabName = (labName) => {
    this.setState({ selectedLabName: labName });
  }

  render() {
    const { current, steps, submitted } = this.state;
    const StepsComponent = steps[current].content;
    return (
      <Spin size="large" spinning={submitted}>
        <TeleHeader />
        {/* <header className="register-header">
          <Row>
            <Col xs={24}>
              <div className="logo">
                <img src={logo} alt="Logo" />
              </div>
            </Col>
          </Row>
        </header> */}
        <section className="testform" >
          <div className="inner-form-wrap">
            <Row>
              <Col xs={24} md={24} className="step-form">
                <Row className="form-row">
                  <Col xs={24}>
                    <div className="form-column">
                      <div className="form-column-inner" style={{ maxWidth: '100%' }}>
                        {this.state.paymentDone === true ?
                          <Success {...this.props} formdata={this.state.data} />
                          : <>
                            <Steps current={current} className="form-type">
                              {steps.map(item => (
                                <Step key={item.title} title={item.title} icon={item.icon} />
                              ))}
                            </Steps>
                            <div className="steps-content">
                              <StepsComponent 
                                saveSelectedLabName={this.saveSelectedLabName}
                                countries={this.state.countries}
                                submitStep={this.submitStep}
                                handleSubmit={this.handleSubmit}
                                parentNext={this.gotoNextStep}
                                parentPrev={this.gotoPreviousStep}
                                data={this.state.data}
                                {...this.props}
                              />
                            </div>
                          </>
                        }
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>
        <TeleFooter />
      </Spin>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.userConfig,
    ...state.countries
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...UserActions, ...adminActions, ...patientActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
  })(Register)
);
