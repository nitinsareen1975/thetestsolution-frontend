import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import logo from "../../assets/images/horizontal-logo.png";
import { notifyUser } from "../../services/notification-service";
import * as UserActions from "../../redux/actions/user-actions";
import { Button, Col, Form, Row, Spin, Steps } from "antd";
import { UserOutlined, SolutionOutlined, CreditCardOutlined, SmileOutlined, ScheduleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import PersonalInformation from "./steps/personal-information.jsx";

import Schedule from "./steps/schedule.jsx";
import Payment from "./steps/payment.jsx";
// import Success from "./steps/success.jsx";
const { Step } = Steps;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      steps:[        
        {
          title:"Information",
          icon: <InfoCircleOutlined />,
          content: <PersonalInformation />,
        },
        {
          title:"Schedule", 
          icon:<ScheduleOutlined />,
          content: <Schedule />,
        },
        {
          title: "Payment Details",
          icon: <CreditCardOutlined />,
          content: <Payment />,
        },
        // {
        //   title:"Done",
        //   icon: <SmileOutlined />,
        //   content: <Success />,
        // }
      ],
      submitted: false
    };
  }

  componentDidMount() {

  }

  handleSubmit = (values) => {
    console.log("VAL:", values)
    this.setState({ submitted: true });
    notifyUser("In progress...", "success");
    this.setState({ submitted: false });
  };

  gotoNextStep(){
    var _current = this.state.current;
    this.setState({current: _current + 1});
  };

  gotoPreviousStep(){
    var _current = this.state.current;
    this.setState({current: _current - 1});
  };

  render() {
    const { current, steps, submitted } = this.state;
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
            {/* <Col xs={24} md={8} className="right-img">
            <img src={registerSideImg} alt="register Img" />
            </Col> */}
            <Col xs={24} md={24} className="step-form">
                <Row className="form-row">
                  <Col xs={24}>
                    <div className="form-column">
                      <div className="form-column-inner" style={{ maxWidth: '100%' }}>                 
                        
                        <Form layout='vertical' onFinish={this.handleSubmit}>
                            <Steps current={current} className="form-type">
                              {steps.map(item => (
                                <Step key={item.title} title={item.title} icon={item.icon}/>
                              ))}
                            </Steps>
                            <div className="steps-content">{steps[current].content}</div>
                            {/* <div className="steps-action">
                              {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => this.gotoNextStep()}>
                                  Next
                                </Button>
                              )}
                              {current === steps.length - 1 && (
                                <Button type="primary" onClick={() => notifyUser('Processing complete!', 'success')}>
                                  Done
                                </Button>
                              )}
                              {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => this.gotoPreviousStep()}>
                                  Previous
                                </Button>
                              )}                            </div> */}
                          
                        </Form>
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
    ...state.userConfig
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...UserActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
  })(Register)
);
