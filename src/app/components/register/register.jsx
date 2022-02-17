import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import logo from "../../assets/images/horizontal-logo.png";
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
import * as UserService from "../../services/user-service";
const { Step } = Steps;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      steps: [
        {
          title: "Information",
          icon: <InfoCircleOutlined />,
          content: PersonalInformation,
        },
        {
          title: "Schedule",
          icon: <ScheduleOutlined />,
          content: Schedule,
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
      paymentDone: false
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
    mergedData.lab_assigned = data.lab_assigned;
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
      scheduled_time: moment(data.scheduled_time).format("HH:mm:ss"),
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
    this.setState({ submitted: true });
    await this.props.registerPatient(args).then((response) => {
        if (response.status && response.status === true) {
          notifyUser(response.message, "success");
          this.setState({ data: { ...args, ...this.state.data }, submitted: false, paymentDone: true });
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

  render() {
    const { current, steps, submitted } = this.state;
    const StepsComponent = steps[current].content;
    return (
      <Spin size="large" spinning={submitted}>
        <header className="register-header">
          <Row>
            <Col xs={24}>
              <div className="logo">
                <img src={logo} alt="Logo" />
              </div>
            </Col>
          </Row>
        </header>
        <section className="testform" >
          <div className="inner-form-wrap">
            <Row>
              <Col xs={24} md={24} className="step-form">
                <Row className="form-row">
                  <Col xs={24}>
                    <div className="form-column">
                      <div className="form-column-inner" style={{ maxWidth: '100%' }}>
                        {this.state.paymentDone === true ?
                          <Success {...this.props} formdata={this.state.data}/>
                          : <>
                            <Steps current={current} className="form-type">
                              {steps.map(item => (
                                <Step key={item.title} title={item.title} icon={item.icon} />
                              ))}
                            </Steps>
                            <div className="steps-content">
                              <StepsComponent
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
