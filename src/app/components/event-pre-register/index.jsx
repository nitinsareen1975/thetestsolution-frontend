import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { notifyUser } from "../../services/notification-service";
import * as adminActions from "../../redux/actions/admin-actions";
import GroupConciergeAPI from "../../redux/api/group-concierge-api";
import { Button, Col, Form, Row, Spin, Typography, Input, Select, DatePicker, Descriptions, Tooltip, Checkbox, Modal } from "antd";
import { SaveOutlined } from '@ant-design/icons';
import moment from "moment";
import TeleHeader from "./header-footer/header.jsx";
import TeleFooter from "./header-footer/footer.jsx";
import * as UserService from "../../services/user-service";
import Config from "../../config";
import IntlMessages from "../../services/intlMesseges";
import Success from "./success.jsx";

class EventPreRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      data: [],
      countries: [],
      paymentDone: false,
      selectedLabName: "Florida",
      termsModalVisible: false,
      event: {},
      showThankYouPage: false
    };
  }

  async componentDidMount() {
    if (this.props.match.params.eventId == 'thank-you') {
      this.setState({ showThankYouPage: true });
    } else {
      var _countries = [];
      if (typeof this.props.countries === "undefined" || this.props.countries.length <= 0) {
        _countries = await this.props.getCountries();
      } else {
        _countries = this.props.countries;
      }
      var _event = await GroupConciergeAPI.getGlobalGroupEvent(window.atob(this.props.match.params.eventId));
      this.setState({
        event: _event.data ? _event.data : {},
        countries: _countries
      });
    }
  }

  handleSubmit = async (values) => {
    var data = { ...values, ...this.state.data };
    var args = {
      group_id: this.state.event.id,
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
      is_lab_collected: 1,
      progress_status: "1",
      confirmation_code: UserService.getRandomString(24, data.email)
    };
    
    this.setState({ submitted: true });
    await GroupConciergeAPI.addGlobalGroupPatient(args).then((response) => {
      if (response.status && response.status === true) {
        notifyUser(response.message, "success");
        this.props.history.push("./thank-you");
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

  render() {
    const { submitted, event, showThankYouPage } = this.state;
    return (
      showThankYouPage ? <Success /> : 
      <Spin size="large" spinning={submitted}>
        <Modal
          title="Informed Consent and No-Cancellation Policy"
          visible={this.state.termsModalVisible}
          onOk={() => this.setState({ termsModalVisible: false })}
          onCancel={() => this.setState({ termsModalVisible: false })}
          footer={null}
          width={767}
        >
          <div className="divWaiver" >
            <p>Please carefully read and sign the following Informed Consent:</p>
            <p style={{ marginleft: 40 + 'px' }}>A)	I authorize this COVID-19 testing unit to conduct collection and testing for COVID-19 through a nasopharyngeal swab or oral swab, as a requirement of testing by an authorized medical provider and lab.</p>
            <p style={{ marginleft: 40 + 'px' }}>B)	I authorize my test results to be disclosed to the county, state, or to any other governmental entity as required by law. This authorization is valid for one (1) year from the date this authorization is signed.</p>
            <p style={{ marginleft: 40 + 'px' }}>C)	I acknowledge that a positive test result is an indication that I must self-isolate and/or wear a mask or face covering as directed to avoid infecting others.</p>
            <p style={{ marginleft: 40 + 'px' }}>D)	I understand that “TelestarHealth,” or our partner service providers are not acting as my medical provider, this testing does not replace treatment by my medical provider, and I assume complete and full responsibility to take appropriate action with regards to my test results. I agree I will seek medical advice, care, and treatment from my medical provider if I have questions or concerns, or if I receive a positive result and my condition worsens.</p>
            <p style={{ marginleft: 40 + 'px' }}>E)	I understand that, as with any medical test, there is a possibility of a false positive or false negative COVID-19 test result.</p>
            <p style={{ marginleft: 40 + 'px' }}>F)	Customer understands and acknowledges that there shall be no cancellations and/or refunds given once they are checked in at one of our “TelestarHealth” service provider labs and testing is performed.</p>
            <p>I, the undersigned, understand the test purpose, procedures, possible benefits, and risks, and I understand that I will receive a copy of this Informed Consent over email along with my registration confirmation. I understand that I can ask questions at any time while at the lab. I voluntarily agree to this testing for COVID-19 and fully understand that payment for this service is final once I have checked-in for service at one of our “TelestarHealth” service provider labs and testing is performed.</p>
          </div>
        </Modal>
        <TeleHeader />
        <section className="testform" >
          <div className="inner-form-wrap">
            <Form layout="vertical" onFinish={this.handleSubmit}>
              <div className="form-column">
                <div className="form-column-inner" style={{ maxWidth: '100%', padding: 10 }}>
                  {event.id ?
                    <>
                      <Row gutter={24}>
                        <Col xs={24} sm={24}>
                          <Typography.Title style={{ margin: 0 }} level={4}>Event Information</Typography.Title>
                        </Col>
                      </Row>
                      <hr />
                      <Row gutter={24}>
                        <Col xs={24} sm={24}>
                          <Descriptions>
                            <Descriptions.Item label={<strong>Event Name</strong>}>{event.name}</Descriptions.Item>
                            <Descriptions.Item label={<strong>Event Location</strong>}>{event.address}</Descriptions.Item>
                            <Descriptions.Item label={<strong>Date and Time</strong>}>{moment(event.event_date).format("MM/DD/YYYY")} @ {moment(event.event_time).format("hh:mm A")}</Descriptions.Item>
                          </Descriptions>
                        </Col>
                      </Row>
                      <br />
                    </>
                    : ''}
                  <Row gutter={24}>
                    <Col xs={24} sm={24}>
                      <Typography.Title style={{ margin: 0 }} level={4}>Contact Information</Typography.Title>
                    </Col>
                  </Row>
                  <hr />
                  <Row gutter={24}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item name="firstname" label="Full Name" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="Full Name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item name="middlename" label="Middle Name">
                        <Input placeholder="Middle Name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item name="lastname" label="Last Name" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item name="email" label="Your Email" rules={[{ type: 'email', required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="Enter Email" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="Phone Number" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item name="gender" label="Sex" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Select placeholder="sex">
                          <Select.Option value="Male">Male</Select.Option>
                          <Select.Option value="Female">Female</Select.Option>
                          <Select.Option value="Other">Other</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item name="dob" label="Birthday" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <DatePicker placeholder="Date Of Birth" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item name="ethnicity" label="Ethnicity" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Select placeholder="Ethnicity">
                          <Select.Option value="Hispanic">Hispanic</Select.Option>
                          <Select.Option value="Non-Hispanic">Non-Hispanic</Select.Option>
                          <Select.Option value="No Response">No Response</Select.Option>
                          <Select.Option value="Unknown">Unknown</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col xs={24} sm={24}>
                      <Typography.Title style={{ margin: 0 }} level={4}>Address Information</Typography.Title>
                    </Col>
                  </Row>
                  <hr />
                  <Row gutter={24}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item name="street" label="Street" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="Street" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item name="city" label="City" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="City" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item name="state" label="State" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="State" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item name="country" label="Country" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Select
                          showSearch
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {this.state.countries.map(function (item) {
                            return (
                              <Option key={item.id.toString()} value={item.id.toString()}>
                                {item.name}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <Form.Item name="zip" label="Zip Code" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                        <Input placeholder="Zip Code" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col xs={24}>
                      <Form.Item
                        name='agreed'
                        valuePropName="checked"
                        rules={[{
                          validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Please confirm you agree to the terms')),
                        }]}
                      >
                        <Checkbox defaultChecked={false}>I agree to the <Tooltip title="Click here to view"><Button style={{ padding: 0, fontWeight: 'bold' }} type="link" onClick={() => this.setState({ termsModalVisible: true })}>Informed Consent and No-Cancellation Policy</Button></Tooltip></Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col xs={24}>
                      <Button
                        type="primary"
                        style={{ display: "inline-block" }}
                        className="def-blue"
                        htmlType="submit"
                        size="large"
                        icon={<SaveOutlined />}
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Form>
          </div>
        </section>
        <TeleFooter />
      </Spin>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.countries
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...adminActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
  })(EventPreRegister)
);
