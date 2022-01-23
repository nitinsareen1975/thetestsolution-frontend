import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import logo from "../../assets/images/logo.png";
import LoginImage from "../../assets/images/logo.png";
import { notifyUser } from "../../services/notification-service";
import { Spin } from "antd";
import { Checkbox } from 'antd';
import UserRoles from "../../user-roles";

class Login extends Component {
  constructor(props) {
    super(props);
    if (window.performance) {
      if (performance.navigation.type === 1) {
        //this.unsetTempData();
      }
    }
    this.state = {
      email: localStorage.getItem("email_submitted") || "",
      password: localStorage.getItem("password_submitted") || "",
      remember_me: false,
      submitted: false
    };
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    if (this.props.isLoggedIn === true) {
      this.props.history.push(JSON.parse(localStorage.getItem("user")).redirect);
    } else {
      let isRemember = localStorage.getItem("remember_me") || this.state.remember_me;
      if(isRemember == "false"){
        localStorage.clear();
      }
      /* let loggedInUser = localStorage.getItem("user");
      loggedInUser = (loggedInUser != "") ? JSON.parse(localStorage.getItem("user")) : null;
      if(loggedInUser !== null){
        this.props.history.push(UserRoles.types[loggedInUser.role].url);
      } */
      this.emailInput.focus();
    };
  }

  handleChange = e => {
    this.setState({ loginMessage: "" });
    const { name, value } = e.target;
    if(e.target.type === "checkbox"){
      this.setState({ [name]: e.target.checked });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password, remember_me } = this.state;
    this.setTempData(email, password, remember_me);
    if (email && password) {
      this.signIn(email, password);
    } else {
      notifyUser("Please enter the details.", "error");
      this.setState({ submitted: false });
    }
  };
  signIn = async (email, password) => {
    var self = this;
    await self.props.login(email, password);
    if (self.props.redirect && self.props.redirect !== "") {
      self.props.cleanDivisionsTree();
      self.unsetTempData();
      self.props.history.push(self.props.redirect, { isLoggedIn: true });
    } else {
      self.setState({ submitted: false });
    }
  };
  setTempData = (email, password, remember_me) => {
    localStorage.setItem("email_submitted", email);
    localStorage.setItem("password_submitted", password);
    localStorage.setItem("remember_me", remember_me);
  };
  unsetTempData = () => {
    localStorage.removeItem("email_submitted");
    localStorage.removeItem("password_submitted");
    //localStorage.removeItem("remember_me");
  };
  render() {
    const { email, password, submitted } = this.state;
    return (
      <Spin size="large" spinning={submitted}>
        <section id="login" className="aligner">
          <div className="wrap1500">
            {/*Login section left side */}
            <div className="login">
              {/* logo */}
              <div className="logo">
                <img src={logo} alt="Logo" />
              </div>
              {/* logo ends */}
              {/* title */}
              <h2>
                Login
              </h2>
              {/* title ends */}
              {/* logi form */}
              <form>
                <div className="login-form">
                  {/* Email */}
                  <div className="row">
                    <div className="full-width">
                      <i className="far fa-envelope"></i>
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        ref={input => {
                          this.emailInput = input;
                        }}
                      />
                    </div>
                  </div>
                  {/* Email ends*/}
                  {/* password */}
                  <div className="row">
                    <div className="full-width">
                      <i className="fas fa-lock"></i>
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  {/* password ends */}
                  <div className="row" style={{marginTop:"20px" , marginBottom:"20px"}}>
                    <div className="half-width">
                      <Checkbox name="remember_me" onChange={this.handleChange}>Remember Me</Checkbox>
                    </div>
                    <div className="half-width" style={{textAlign:"right"}}>
                      <a href="/forgot-password">
                        Forgot password
                      </a>
                    </div>
                  </div>
                  {/* submit button */}
                  <div className="row">
                    <div className="full-width">
                      <input
                        type="submit"
                        value="Login"
                        onClick={this.handleSubmit}
                      />
                    </div>
                  </div>
                  <div className="clear">&nbsp;</div>

                  <p>{this.state.loginMessage}</p>
                  <p>{/*this.props.loginErrorMessage*/}</p>
                  {/* submit button ends */}
                </div>
              </form>
              {/* login form ends */}
            </div>
            {/*login section left side ends */}
            {/* Image area  */}
            <div className="image-area log-imag">
              <img src={LoginImage} alt="login" />
            </div>
            {/* image are ends  */}
          </div>
        </section>
      </Spin>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  loginErrorMessage: PropTypes.string,
  redirect: PropTypes.string,
  userData: PropTypes.object,
  cleanDivisionsTree: PropTypes.func
};
function mapStateToProps(state) {
  return {
    ...state.user
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
  })(Login)
);
