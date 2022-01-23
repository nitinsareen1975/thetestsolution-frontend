import React, { Component } from "react";
import logo from "../../assets/images/logo.png";
import LoginImage from "../../assets/images/logo.png";
import { notifyUser } from "../../services/notification-service";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      email: "",
      message: "",
      submitted: false,
      submitButtonText: "Send"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ message: "" });
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    let regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({ submitted: true, submitButtonText: "Please wait..." });
    if (this.state.email) {
      if (regEx.test(this.state.email) !== true) {
        notifyUser("Please provide a valid email address.", "error");
        this.setState({
          email: "",
          submitted: false,
          submitButtonText: "Send"
        });
      } else {
        try {
          let response = await API.forgotPassword({
            userName: this.state.email
          });
          this.setState(response);
          if (response.success) {
            notifyUser(
              "A reset password email has been sent your email id.",
              "success"
            );
          } else {
            notifyUser("Unknown error! Please try again.", "error");
          }
          this.setState({
            email: "",
            submitted: false,
            submitButtonText: "Send"
          });
        } catch (e) {
          /* if(e.response.data.error && e.response.data.error != ''){
            notifyUser(e.response.data.error, 'error');
          } */
          if (e && e.response && e.response.data.errors && e.response.data.errors.length > 0) {
            notifyUser(e.response.data.errors[0].externalMessage,"success");
  
          }else {
            notifyUser("Unknown error! Please try again.", "error");

          }
                 
          this.setState({
            email: "",
            submitted: false,
            submitButtonText: "Send"
          });
        }
      }
    } else {
      notifyUser("Please enter the details.", "error");
      this.setState({ submitted: false, submitButtonText: "Send" });
    }
  }

  /* section skin */
  render() {
    return (
      <section id="forgot-password" className="aligner">
        <div className="wrap1500">
          {/*Login section left side */}
          <div className="login">
            {/* logo */}
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            {/* logo ends */}
            {/* title */}
            <h2>Forgot Password</h2>
            {/* title ends */}
            {/* logi form */}
            <div className="login-form">
              <div className="row response">
                <div className="full-width">{this.state.message}</div>
              </div>
              {/* Email */}
              <div className="row">
                <div className="full-width">
                  <i className="far fa-envelope"></i>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email Address..."
                    defaultValue={this.state.success ? "" : this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {/* Email ends*/}
              {/* submit button */}
              <div className="row">
                <div className="full-width">
                  <input
                    type="submit"
                    value={this.state.submitButtonText}
                    onClick={this.handleSubmit}
                  />
                </div>

              </div>
              <div className="row" style={{ marginTop: "10px" }}>
                <div className="full-width">

                  <a href="/login"><span>Back to Login</span></a>

                </div>
              </div>
              {/* submit button ends */}
            </div>
            {/* login form ends */}
          </div>
          {/*login section left side ends */}
          {/* Image area  */}
          <div className="image-area">
            <img src={LoginImage} alt="forgot password" />
          </div>
          {/* image are ends  */}
        </div>
      </section>
    );
  }
}
export default ForgotPassword;
