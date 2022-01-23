import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../../redux/actions/user-actions";
import * as RolesActions from "../../../redux/actions/roles-actions";
import API from "../../../redux/api/admin-api";
import { notifyUser } from "../../../services/notification-service";
import { Typography, Form, Input, Select, Button, Row, Col, Spin} from "antd";
import AppLocale from "../../../languageProvider";
const { Option } = Select;

class UserEdit extends React.Component {
  state = {
    loading: true,
    confirmDirty: false,
    userId: 0,
    identityId: "",
    firstName: "",
    lastName: "",
    userName: "",
    contactNo: "",
    address: "",
    state: "",
    countryId: "",
    roleId: "",
    created: "",
    countries: [],
    allRoles: [],
    dataLoaded: false
  };

  async componentDidMount() {
    let user = [],
      userRolesList = [];
    if (
      this.props.match &&
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id &&
      this.props.match.params.id !== "new"
    ) {
      this.setState({ userId: this.props.match.params.id });
      user = await this.props.getUser(this.props.match.params.id);

      //this.props.form.setFieldsValue(user);
      this.setState(user.data);
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
    }
    let countriesListTemp = await API.getCountriesList();
    var countries=[]
    countriesListTemp.countries.forEach(function(country){
      if(country.countryName!=='All Countries'){
          countries.push(country)
      }
    })
    this.setState({ countries: countries });
    if (this.props.userData.companyID && this.props.userData.companyID === 1) { //focuspoint organization
      userRolesList = await this.props.getAllInternalRoles();
    } else {
      userRolesList = await this.props.getAllExternalRoles();
    }
    this.setState({ allRoles: userRolesList, companyId: this.props.userData.companyID, dataLoaded: true  });
  }

  /* componentDidUpdate() {
    if (this.state.dataLoaded === false) {
      this.setState({ companyId: this.props.userData.companyID, dataLoaded: true });
    }
  } */

  submitFormAdd = data => {
    const { language } = this.props;
    const currentAppLocale = AppLocale[language.locale];
    this.props
      .updateUser(data)
      .then(response => {
        if (response.error) {
          if (response.error.message) {
            notifyUser(response.error.message, "error");
          } else {
            notifyUser("Unknown error. Please try again!", "error");
          }
          this.setState({ loading: false });
        } else {
          notifyUser(currentAppLocale.messages["admin.user.add.success"], "success");
          //notifyUser("User added successfully!", "success");
          this.props.history.push("./");
          this.setState({ loading: false });
        }
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  submitFormEdit = data => {
    const { language } = this.props;
    const currentAppLocale = AppLocale[language.locale];
    this.props
      .updateUser(data)
      .then(response => {
        if (response.error) {
          if (response.error.message) {
            notifyUser(response.error.message, "error");
          } else {
            notifyUser("Unknown error. Please try again!", "error");
          }
          this.setState({ loading: false });
        } else {
          this.props.history.push("./");
          this.setState({ loading: false });
          notifyUser(currentAppLocale.messages["admin.user.update.success"], "success");
          //notifyUser("User updated successfully!", "success");
        }
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.keys(values).map(function (key, _idx) {
          if (values[key] == null) {
            values[key] = '';
          } else {
            if (typeof values[key] == 'string') {
              values[key] = values[key].trim();
            }
          }
        });
        this.setState({ loading: true });
        if (this.state.userId && this.state.userId > 0) {
          values["userId"] = this.state.userId;
          values["identityId"] = this.state.identityId;
          values["companyId"] = this.state.companyId;
          values["assignedUsers"] = [];
          this.submitFormEdit(values);
        } else {
          values["assignedUsers"] = [];
          values["companyId"] = this.state.companyId;
          this.submitFormAdd(values);
        }
      }
    });
  };

  handleContactExistance(rule, value, callback){
    const re = (/^(?=[+0-9]*$)(?!.*[<>'"/;`%~@#$^*()_=[\]{}|\\,.?: -])/);
    // const re = (/^[+-]?\d+$/)
    //var val=value.match(/(\d+)/)[0]
    var test=re.test(value)
    if(value !=="" && (value.length <6 || test ===false)){
      callback(<IntlMessages id ="admin.phonenumber.valid"/>)
    }
    else{
      callback();
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === "horizontal"
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
        : null;
    const rolesSelector = getFieldDecorator("roleId", {
      rules: [
        {
          required: true,
          message: <IntlMessages id="admin.input.required" />
        }
      ],
      initialValue: this.state.allRoles.length > 0 ? this.state.roleId : null
    })(
      <Select>
        {this.state.allRoles.map(function (item) {
          return <Option key={item.id}>{item.name}</Option>;
        })}
      </Select>
    );
    const countriesSelector = getFieldDecorator("countryId", {
      initialValue: this.state.countryId
    })(
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
        {this.state.countries.map(function (item) {
          return (
            <Option key={item.countryId} value={item.countryId}>
              {item.countryName}
            </Option>
          );
        })}
      </Select>
    );
    return (
      <div>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Typography.Title level={4}>
              {this.state.userId === 0 ? (
                <IntlMessages id="admin.manageUser.addUser" />
              ) : (
                  <div>
                    <IntlMessages id="admin.manageUser.editUser" />
                  </div>
                )}
            </Typography.Title>
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
              onClick={() => this.props.history.push("./")}
            >
              <IntlMessages id="admin.userlisting.back" />
            </Button>
          </Col>
        </Row>
        <hr />
        <div>
          <Spin spinning={this.state.loading}>
            <Form layout={formLayout} onSubmit={this.handleSubmit}>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item
                    {...formItemLayout}
                    label={<IntlMessages id="admin.userlisting.firstName" />}
                  >
                    {getFieldDecorator("firstName", {
                      rules: [
                        {
                          whitespace: true,
                          required: true,
                          message: <IntlMessages id="admin.input.required" />
                        },
                        {
                          pattern: new RegExp(/^(\S.*)[a-zA-Z-.']+$/),
                          message: <IntlMessages id ="admin.name.valid"></IntlMessages>
                        }
                      ],
                      initialValue:
                        this.state.firstName === null
                          ? ""
                          : this.state.firstName
                    })(<Input maxLength={20} />)}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item
                    {...formItemLayout}
                    label={<IntlMessages id="admin.userlisting.lastName" />}
                  >
                    {getFieldDecorator("lastName", {
                      rules: [
                        {
                          whitespace: true,
                          required: true,
                          message: <IntlMessages id="admin.input.required" />
                        },
                        {
                          pattern: new RegExp(/^(\S.*)[a-zA-Z-.']+$/),
                          message: <IntlMessages id ="admin.lname.valid"></IntlMessages>
                        }
                      ],
                      initialValue:
                        this.state.lastName === null ? "" : this.state.lastName
                    })(<Input maxLength={20} />)}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item
                    {...formItemLayout}
                    label={<IntlMessages id="admin.userlisting.email" />}
                  >
                    {getFieldDecorator("userName", {
                      rules: [
                        {
                          type: "email",
                          message: <IntlMessages id="admin.email.valid" />

                        },
                        {
                          whitespace: true,
                          required: true,
                          message: <IntlMessages id="admin.input.required" />
                        }
                      ],
                      initialValue:
                        this.state.userName === null ? "" : this.state.userName
                    })(
                      this.state.userId === 0 ? <Input maxLength={80} /> : <Input disabled />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item
                    {...formItemLayout}
                    label={<IntlMessages id="admin.userlisting.phonenumber" />}
                  >

                    {getFieldDecorator("contactNo", {
                      rules: [
                        {
                          whitespace: true,
                          required: true,
                          message: <IntlMessages id="admin.input.required" />
                        },
                        {
                          validator: this.handleContactExistance
                        }
                        //{
                          
                        //   pattern: new RegExp(/^[0-9']+$/),
                        //   message: 'Please enter a valid number!'
                        // },
                        // {
                        //   min: 8,
                        //   message: "Please enter a valid number!"
                        // }
                      ],
                      initialValue: this.state.contactNo === null ? "" : this.state.contactNo
                    })(<Input  maxLength={15} style={{ width: "100%" }} />)}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item
                    {...formItemLayout}
                    label={<IntlMessages id="admin.userlisting.address" />}
                  >
                    {getFieldDecorator("address", {
                      initialValue:
                        this.state.address === null ? "" : this.state.address
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item
                    label={<IntlMessages id="admin.userlisting.country" />}
                  >
                    {countriesSelector}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item
                    label={<IntlMessages id="admin.userlisting.state" />}
                  >
                    {getFieldDecorator("state", {
                      initialValue:
                        this.state.state === null ? "" : this.state.state
                    })(<Input />)}
                  </Form.Item>
                </Col>
                {/*<Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item
                    {...formItemLayout}
                    label={<IntlMessages id="admin.userlisting.zipcode" />}
                  >
                    {getFieldDecorator("zip", {
                      initialValue:
                        this.state.zip === null ? "" : this.state.zip
                    })(<Input />)}
                  </Form.Item>
                </Col> */}
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item
                    {...formItemLayout}
                    label={<IntlMessages id="admin.userlisting.role" />}
                  >
                    {rolesSelector}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item>
                    {/* <Button
                      type="default"
                      className=""
                      htmlType="button"
                      onClick={() => this.props.history.push("./")}
                    >
                      <IntlMessages id="admin.userlisting.back" />
                    </Button>
                    &nbsp;&nbsp; */}
                    <Button
                      type="primary"
                      style={{ display: "inline-block", marginRight: "10px" }}
                      className="def-blue"
                      htmlType="submit"
                    >
                      {this.state.userId > 0 ? (
                        <IntlMessages id="admin.userlisting.update" />
                      ) : (
                          <IntlMessages id="admin.userlisting.add" />
                        )}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Spin>
        </div>
      </div>
    );
  }
}

UserEdit.propTypes = {
  location: PropTypes.object,
  updateUser: PropTypes.func,
  getAllUserRoles: PropTypes.func
};

function mapStateToProps(state) {
  return { ...state.user,...state.language };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...userActions, ...RolesActions }, dispatch);
}
const WrappedForm = Form.create({ name: "edit-user" })(UserEdit);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    WrappedForm
  )
);
