import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as labActions from "../../../redux/actions/lab-actions";
import * as adminActions from "../../../redux/actions/admin-actions";
import { notifyUser } from "../../../services/notification-service";
import {
  Typography,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Spin,
  DatePicker,
  Switch,
  Upload
} from "antd";
import IntlMessages from "../../../services/intlMesseges";
import { PlusCircleOutlined, ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

class AddLab extends React.Component {
  state = {
    loading: true,
    dataLoaded: false,
    logo: null,
    countries: []
  };

  async componentDidMount() {
    var _countries = [];
		if(typeof this.props.countries === "undefined" || this.props.countries.length <= 0 ){
			_countries = await this.props.getCountries();
		} else {
			_countries = this.props.countries;
		}
    this.setState({
      loading: false,
      countries: _countries,
      dataLoaded: true
    });
  }

  handleSubmit = (data) => {
    if(typeof data.date_incorporated !== "undefined"){
      data.date_incorporated = moment(data.date_incorporated).format("YYYY-MM-DD");
    }
    if(typeof data.tests_available !== "undefined"){
      data.tests_available = data.tests_available.join(",");
    }

    const formData = new FormData();
    if(typeof data.logo !== "undefined" && data.logo !== null && data.logo.file){
      formData.append('logo', data.logo);
    }
    for (const key in data) {
      if(key !== "logo"){
        if(typeof data[key] === "undefined"){
          data[key] = "";
        }
        formData.set(key, data[key]);
      }
    }
    this.setState({ loading: true });
    this.props.addLab(formData).then((response) => {
      if (response.status && response.status === true) {
        notifyUser(response.message, "success");
        this.props.history.push("./");
        this.setState({ loading: false });
      } else {
        if (response.message) {
          notifyUser(response.message, "error");
        } else {
          notifyUser("Unknown error. Please try again!", "error");
        }
        this.setState({ loading: false });
      }
    })
    .catch((err) => {
      this.setState({ loading: false });
    });
  };

  uploaderProps = (field, accept) => {
    let _this = this;
    return {
      showUploadList: true,
      accept: accept,
      multiple: false,
      beforeUpload: file => {
        if(file.type.indexOf('image/') === -1){
          message.error(<IntlMessages id="admin.fileupload.acceptedtypes"/>);
          _this.setState({[field]: null});
        } else {
          _this.setState({[field]: file});
        }
        return false;
      },
      onRemove: _file => {
        _this.setState({[field]: null});
      },
      onSuccess: _res => {
        _this.setState({[field]: null});
      },
      onError(_err) {
        message.error(<IntlMessages id="admin.fileupload.failed"/>);
      }
    }
  }

  render() {
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === "horizontal"
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
        : null;
    return (
      <div>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Typography.Title level={4}>Add New Lab</Typography.Title>
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
              onClick={() => this.props.history.goBack()}
            >
              <ArrowLeftOutlined />
              <IntlMessages id="admin.userlisting.back" />
            </Button>
          </Col>
        </Row>
        <hr />
        <div>
          <Spin spinning={this.state.loading}>
            <Form layout="vertical" onFinish={this.handleSubmit}>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    name="name"
                    label="Lab Name"
                    rules={[
                      {
                        whitespace: true,
                        required: true,
                        message: <IntlMessages id="admin.input.required" />,
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    name="email"
                    label="Lab Email Address"
                    rules={[
                      {
                        type: "email",
                        message: <IntlMessages id="admin.email.valid" />,
                      },
                      { 
                        whitespace: true,
                        required: true,
                        message: <IntlMessages id="admin.input.required" />,
                      }
                    ]}
                  >
                    <Input  />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    name="phone"
                    label="Lab Contact Number"
                    rules={[
                      {
                        required: true,
                        message: <IntlMessages id="admin.input.required" />,
                      }
                    ]}
                  >
                    <Input/>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    name="concerned_person_name"
                    label="Concerned Person Name"
                    rules={[
                      {
                        whitespace: true,
                        required: true,
                        message: <IntlMessages id="admin.input.required" />,
                      }
                    ]}
                  >
                    <Input/>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Licence Number"
                    name="licence_number"
                    rules={[
                      {
                        required: true,
                        message: <IntlMessages id="admin.input.required" />,
                      }
                    ]}
                  >
                    <Input  />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Company Logo (Used to attach in invoice)"
                    name="logo"
                  >
                    <Upload {...this.uploaderProps('logo', '.jpg,.jpeg,.png')}>
                      <Button>
                        <UploadOutlined /> <IntlMessages id="admin.select.uploadfile" />
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Price per test"
                    name="price_per_test"
                    rules={[
                      {
                        required: true,
                        message: <IntlMessages id="admin.input.required" />,
                      }
                    ]}
                  >
                    <Input
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Type Of Tests Available"
                    name="tests_available"
                    rules={[
                      {
                        required: true,
                        message: <IntlMessages id="admin.input.required" />,
                      },
                    ]}
                  >
                    <Select 
                      mode="multiple"
                      showSearch
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value={1}>Test type 1</Option>
                      <Option value={2}>Test type 2</Option>
                      <Option value={3}>Test type 3</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item 
                    {...formItemLayout} 
                    label="Test Codes"
                    name="test_codes"
                    >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Onboarding Date"
                    name="date_incorporated"
                  >
                    <DatePicker />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Payment Days"
                    name="payment_days"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Payment Mode"
                    name="payment_mode"
                  >
                    <Select />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Tax Applicable?"
                    name="has_tax"
                  >
                    <Switch
                      checkedChildren={"Yes"}
                      unCheckedChildren={"No"}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Has Compliance?"
                    name="has_compliance"
                  >
                    <Switch
                      checkedChildren={"Yes"}
                      unCheckedChildren={"No"}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="street"
                    name="Street"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item 
                    {...formItemLayout} 
                    label="City"
                    name="city"
                    >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="State"
                    name="state"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="County"
                    name="county"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Country"
                    name="country"
                  >
                    <Select
                      showSearch
                      filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.state.countries.map(function(item) {
                      return (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="ZIP Code"
                    name="zip"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Status"
                    name="status"
                  >
                    <Switch
                      checkedChildren={"Active"}
                      unCheckedChildren={"Inactive"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item>
                    <Button
                      type="primary"
                      style={{ display: "inline-block", marginRight: "10px" }}
                      className="def-blue"
                      htmlType="submit"
                      size="large"
                    >
                      <IntlMessages id="admin.userlisting.add" />
                      <PlusCircleOutlined />
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

function mapStateToProps(state) {
  return { ...state.adminConfig };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...labActions, ...adminActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    AddLab
  )
);
