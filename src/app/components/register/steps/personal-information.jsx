import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { notifyUser } from "../../../services/notification-service";
import * as UserActions from "../../../redux/actions/user-actions";
import { Button, Col, Form, Row, Spin, Steps } from "antd";
import { UserOutlined, SolutionOutlined, HomeOutlined, ContactsOutlined, DeploymentUnitOutlined, ExceptionOutlined, ExperimentOutlined } from '@ant-design/icons';
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
        {
          title: "Test",
          icon: <ExperimentOutlined />,
          content: TestInfo
        }
      ],
      data: {},
      submitted: false
    };
  }

  handleSubmit = (data) => {
    var mergedData = {...data, ...this.state.data};
    this.setState({ data: mergedData });
    this.props.handleSubmit(mergedData);
  };

  gotoNextStep = (data) =>  {
    var mergedData = {...data, ...this.state.data};
    console.log("md:", mergedData)
    var _current = this.state.current;
    if(_current === (this.state.steps.length - 1)){
      this.submitStep(mergedData);
      this.setState({ data: mergedData });
    } else {
      this.setState({ current: _current + 1, data: mergedData });
    }
  };

  gotoPreviousStep = () => {
    var _current = this.state.current;
    if(_current === 0){
      this.props.parentPrev();
    } else {
      this.setState({ current: _current - 1 });
    }
  };

  submitStep = (data) => {
    this.props.submitStep(data);
  }

  render() {
    const { current, steps, submitted } = this.state;
    const StepComponent = steps[current].content;
    return (
      <Spin size="large" spinning={submitted}>
        <Row>
          <Col xs={24} md={24} className="step-form">
            <Row className="form-row">
              <Col xs={24}>
                <div className="form-column">
                  <div className="form-column-inner" style={{ maxWidth: '100%' }}>
                    <h2>Fill Your Information</h2>
                    <hr className="title-hr" />
                    <div>
                      <Steps current={current}>
                        {steps.map(item => (
                          <Step key={item.title} title={item.title} icon={item.icon} />
                        ))}
                      </Steps>
                      <div className="steps-content">
                        <StepComponent
                          submitData={this.handleSubmit} 
                          next={this.gotoNextStep} 
                          prev={this.gotoPreviousStep} 
                          data={this.state.data} 
                          {...this.props} 
                        />
                      </div>
                    </div>
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
