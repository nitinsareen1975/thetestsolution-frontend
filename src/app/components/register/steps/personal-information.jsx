import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { notifyUser } from "../../../services/notification-service";
import * as UserActions from "../../../redux/actions/user-actions";
import { Button, Col, Form, Row, Spin, Steps, Input, Select, InputNumber } from "antd";
import { UserOutlined, SolutionOutlined, HomeOutlined, ContactsOutlined, DeploymentUnitOutlined, ExceptionOutlined, ExperimentOutlined } from '@ant-design/icons';
import Waiver from "../steps/information/waiver.jsx";
import ContactInfo from "../steps/information/contact-info.jsx";
import DetailsInfo from "../steps/information/personal-info.jsx";
import HomeAddressInfo from "../steps/information/home-address.jsx";
import SymptomsInfo from "../steps/information/symptoms-info.jsx";
import Identification from "../steps/information/identification.jsx";
import TestInfo from "../steps/information/test.jsx";
import IntlMessages from "../../../services/intlMesseges";
import stripeBadge from "../../../assets/images/stripe-badge-white.png";
import stripeBadge2 from "../../../assets/images/stripe-badge-white-2.jpg";

const { Step } = Steps;

class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      steps: [
        {
          title: "Waiver",
          icon: <UserOutlined />,
          content: Waiver
        },
        {
          title: "Contact Info",
          icon: <ContactsOutlined />,
          content: ContactInfo
        },
        {
          title: "Personal Info",
          icon: <SolutionOutlined />,
          content: DetailsInfo
        },
        {
          title: "Home Address",
          icon: <HomeOutlined />,
          content: HomeAddressInfo
        },
        {
          title: "Symptoms Info",
          icon: <DeploymentUnitOutlined />,
          content: SymptomsInfo
        },
        {
          title: "Identification",
          icon: <ExceptionOutlined />,
          content: Identification
        },
        /* {
          title: "Test",
          icon: <ExperimentOutlined />,
          content: TestInfo
        } */
      ],
      data: {},
      submitted: false
    };
  }

  handleSubmit = (data) => {
    var mergedData = { ...data, ...this.state.data };
    this.setState({ data: mergedData });
    this.props.handleSubmit(mergedData);
  };

  gotoNextStep = (data) => {
    var mergedData = { ...data, ...this.state.data };
    var _current = this.state.current;
    if (_current === (this.state.steps.length - 1)) {
      this.submitStep(mergedData);
      this.setState({ data: mergedData });
    } else {
      this.setState({ current: _current + 1, data: mergedData });
    }
  };

  gotoPreviousStep = () => {
    var _current = this.state.current;
    if (_current === 0) {
      this.props.parentPrev();
    } else {
      this.setState({ current: _current - 1 });
    }
  };

  submitStep = (data) => {
    this.props.submitStep(data);
  }

  formatDOB = (dob) => {
    var cleaned = ('' + dob).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    }
    return null;
  }

  render() {
    const { submitted } = this.state;
    var _countries = (typeof this.props.countries === "undefined") ? [] : this.props.countries;
    return (
      <Spin size="large" spinning={submitted}>
        <Row>
          <Col xs={24} md={24} className="step-form">
            <Row className="form-row">
              <Col xs={24}>
                <Form layout="vertical" onFinish={(values) => this.submitStep(values)} initialValues={this.props.data} size="large">
                  <div className="form-column">
                    <div className="form-column-inner" style={{ maxWidth: '100%' }}>
                      <h2>Personal Information</h2>
                      <hr className="title-hr" />
                      <div>
                        <Row gutter={15}>
                          <Col xs={24} sm={8} md={6}>
                            <Form.Item name="firstname" label="First Name" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                              <Input placeholder="First Name" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={8} md={6}>
                            <Form.Item name="lastname" label="Last Name">
                              <Input placeholder="Last Name" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={8} md={6}>
                            <Form.Item name="email" label="Your Email" rules={[{ type: 'email', required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                              <Input placeholder="Enter Email" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={8} md={6}>
                            <Form.Item
                              name="cemail"
                              onPaste={(e) => { e.preventDefault(); return false; }}
                              label="Confirm Your Email"
                              dependencies={['email']}
                              rules={[
                                {
                                  type: 'email',
                                  required: true,
                                  message: <IntlMessages id="admin.input.required" />
                                },
                                ({ getFieldValue }) => ({
                                  validator(_, value) {
                                    if (!value || getFieldValue('email') === value) {
                                      return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The email address that you entered do not match!'));
                                  },
                                })
                              ]}
                            >
                              <Input placeholder="Confirm Email" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={8} md={6}>
                            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                              <Input placeholder="Phone Number" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={8} md={6}>
                            <Form.Item name="gender" label="Gender" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                              <Select placeholder="Gender">
                                <Select.Option value="Male">Male</Select.Option>
                                <Select.Option value="Female">Female</Select.Option>
                                <Select.Option value="Other">Other</Select.Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={8} md={6}>
                            <Form.Item name="dob" label="Birthday" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                              {/* <DatePicker placeholder="Date Of Birth" disabledDate={(current) => moment().add(-16, 'years')  <= current} /> */}
                              <InputNumber
                                controls={false}
                                formatter={value => this.formatDOB(value)}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                placeholder="YYYY-MM-DD"
                                style={{ width: '100%' }}
                                maxLength={10}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={8} md={6}>
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
                        <Row gutter={15}>
                          <Col xs={24}>
                            <h3>Address Information</h3>
                            <hr className="title-hr" />
                          </Col>
                        </Row>
                        <Row gutter={15}>
                          <Col xs={24} sm={24} md={12}>
                            <Form.Item name="street" label="Address line 1" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                              <Input placeholder="Address line 1" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={12}>
                            <Form.Item name="street2" label="Address line 2">
                              <Input placeholder="Address line 2" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={8} md={6}>
                            <Form.Item name="city" label="City" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                              <Input placeholder="City" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={8} md={6}>
                            <Form.Item name="state" label="State" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                              <Input placeholder="State" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={8} md={6}>
                            <Form.Item name="country" label="Country" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                              <Select
                                showSearch
                                filterOption={(input, option) =>
                                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                              >
                                {_countries.map(function (item) {
                                  return (
                                    <Option key={item.id} value={item.id}>
                                      {item.name}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={8} md={6}>
                            <Form.Item name="zip" label="Zip Code" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                              <Input placeholder="Zip Code" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          <div className="steps-action">
                            <Button onClick={() => this.props.parentPrev()}>
                              Previous
                            </Button>
                            <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">
                              Next
                            </Button>
                          </div>
                        </Row>
                        <Row>
                          <img className="stripiBadge" src={stripeBadge} alt="Badge" />
                          <img className="stripiBadge" src={stripeBadge2} alt="Badge" />
                        </Row>
                      </div>
                    </div>
                  </div>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.userConfig
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...UserActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
  })(PersonalInfo)
);
