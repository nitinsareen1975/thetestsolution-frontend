import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { notifyUser } from "../../../services/notification-service";
import * as UserActions from "../../../redux/actions/user-actions";
import { Button, Col, Form, Row, Spin, Steps } from "antd";
import { UserOutlined, SolutionOutlined, HomeOutlined, ContactsOutlined, DeploymentUnitOutlined, ExceptionOutlined, ExperimentOutlined} from '@ant-design/icons';
import Waiver from "../steps/information/waiver.jsx";
import ContactInfo from "../steps/information/contact-info.jsx";
import DetailsInfo from "../steps/information/personal-info.jsx";
import HomeAddressInfo from "../steps/information/home-address.jsx";
import SymptomsInfo from "../steps/information/symptoms-info.jsx";
import Identification from "../steps/information/identification.jsx";
import TestInfo from "../steps/information/test.jsx";

const { Step } = Steps;

class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      steps:[
        {
          title:"Waiver",
          icon: <UserOutlined />,
          content: <Waiver />,
        },
        {
          title:"Contact Info",
          icon: <ContactsOutlined />,
          content: <ContactInfo />,
        },
        {
          title:"Personal Info", 
          icon:<SolutionOutlined />,
          content: <DetailsInfo />,
        },
        {
          title:"Home Address", 
          icon:<HomeOutlined />,
          content: <HomeAddressInfo />,
        },
        {
          title:"Symptoms Info", 
          icon:<DeploymentUnitOutlined />,
          content: <SymptomsInfo />,
        },
        {
          title:"Identification", 
          icon:<ExceptionOutlined />,
          content: <Identification />,
        },
        {
          title:"Test", 
          icon:<ExperimentOutlined />,
          content: <TestInfo />,
        },
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
          <Row>
            {/* <Col xs={24} md={8} className="right-img">
            <img src={registerSideImg} alt="register Img" />
            </Col> */}
            <Col xs={24} md={24} className="step-form">
                <Row className="form-row">
                  <Col xs={24}>
                    <div className="form-column">
                      <div className="form-column-inner" style={{ maxWidth: '100%' }}>                
                      <h2>Fill Your Information</h2>
                        <hr className="title-hr" />
                        <Form layout='vertical' onFinish={this.handleSubmit}>
                          <div>
                            <Steps current={current}>
                              {steps.map(item => (
                                <Step key={item.title} title={item.title} icon={item.icon}/>
                              ))}
                            </Steps>
                            <div className="steps-content">{steps[current].content}</div>
                            <div className="steps-action">
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
                              )}
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
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
