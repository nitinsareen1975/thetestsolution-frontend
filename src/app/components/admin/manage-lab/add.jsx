import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as labActions from "../../../redux/actions/lab-actions";
import * as adminActions from "../../../redux/actions/admin-actions";
import * as testsActions from "../../../redux/actions/tests-actions";
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
  Upload,
  Space
} from "antd";
import IntlMessages from "../../../services/intlMesseges";
import { PlusCircleOutlined, ArrowLeftOutlined, UploadOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import Config from "../../../config";
import Locator from "./locator.jsx";

const { Option } = Select;

class AddLab extends React.Component {
  formRef = React.createRef();
  radiusRef = React.createRef();
  state = {
    loading: true,
    dataLoaded: false,
    logo: null,
    testTypes: [],
    countries: [],
    lab_pricing: [],
    location: {
      lat: 0,
      lng: 0
    },
    minRadius: 50
  };

  async componentDidMount() {
    var _countries = [];
    if (typeof this.props.countries === "undefined" || this.props.countries.length <= 0) {
      _countries = await this.props.getCountries();
    } else {
      _countries = this.props.countries;
    }
    var _testTypes = await this.props.getTestTypes({});
    this.setState({
      loading: false,
      countries: _countries,
      testTypes: _testTypes.data,
      dataLoaded: true
    });
  }

  handleSubmit = async (data) => {
    if (typeof data.date_incorporated !== "undefined") {
      data.date_incorporated = moment(data.date_incorporated).format("YYYY-MM-DD");
    }
    if (typeof data.tests_available !== "undefined") {
      data.tests_available = data.tests_available.join(",");
    }

    var args = {};
    for (const key in data) {
      if (key !== "logo") {
        if (typeof data[key] === "undefined") {
          data[key] = "";
        }
        args[key] = data[key];
      }
    }
    if (typeof this.state.logo !== "undefined" && this.state.logo !== null && typeof this.state.logo !== "string" && this.state.logo.name) {
      const formData = new FormData();
      formData.append('logo', this.state.logo);
      await this.props.uploadLabLogo('lab-logo', this.props.match.params.id, formData).then((response) => {
        if (response.status && response.status === true) {
          args['logo'] = response.data;
        }
      });
    }
    if (this.state.location.lat) {
      args['geo_lat'] = this.state.location.lat;
      args['geo_long'] = this.state.location.lng;
    }
    this.setState({ loading: true });
    await this.props.addLab(args).then(async (response) => {
      if (response.status && response.status === true) {
        if (data.lab_pricing && data.lab_pricing.length > 0) {
          await this.props.updateLabPricing(response.data.id, { pricing: data.lab_pricing }).then(res => {
            if (!res.status || res.status === false) {
              if (res.message) {
                notifyUser(res.message, "error");
              } else {
                notifyUser("Pricing was not updated!", "error");
              }
            }
          });
        }
        notifyUser(response.message, "success");
        this.props.history.push("../labs");
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
        if (file.type.indexOf('image/') === -1) {
          message.error(<IntlMessages id="admin.fileupload.acceptedtypes" />);
          _this.setState({ [field]: null });
        } else {
          _this.setState({ [field]: file });
        }
        return false;
      },
      onRemove: _file => {
        _this.setState({ [field]: null });
      },
      onSuccess: _res => {
        _this.setState({ [field]: null });
      },
      onError(_err) {
        message.error(<IntlMessages id="admin.fileupload.failed" />);
      }
    }
  }

  onValuesChange = (changedFields, allFields) => {
    this.setState({ lab_pricing: allFields.lab_pricing })
  }

  setLatLong = (cords, locationObj) => {
    var _cords = this.state.location;
    if (cords && cords !== null && cords !== undefined) {
      _cords.lat = cords.lat;
      _cords.lng = cords.lng;
    }
    this.setState({
      location: _cords
    }, () => {
      if (locationObj && locationObj.state) {
        this.formRef.current.setFieldsValue({
          street: locationObj.address,
          city: locationObj.city,
          state: locationObj.state,
          zip: locationObj.zip
        });
      }
    });
  }

  render() {
    const { formLayout } = this.state;
    var lab_pricing = this.state.lab_pricing;
    if (lab_pricing.length > 0 && typeof lab_pricing[0] === "undefined") {
      lab_pricing = [];
    }
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
            <Form ref={this.formRef} onValuesChange={this.onValuesChange} layout="vertical" onFinish={this.handleSubmit}>
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
                    <Input />
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
                    <Input />
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
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="CLIA ID"
                    name="licence_number"
                    rules={[
                      {
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
                    label="Facility ID"
                    name="facility_id"
                    rules={[
                      {
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
                    label="Company Logo (Used to attach in invoice)"
                    name="logo"
                  >
                    <Upload {...this.uploaderProps('logo', '.jpg,.jpeg')}>
                      <Button>
                        <UploadOutlined /> <IntlMessages id="admin.select.uploadfile" />
                      </Button>
                    </Upload>
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
              </Row>
              <Row gutter={24}>
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
                    <Select>
                      {this.props.payment_methods && this.props.payment_methods.length > 0 && this.props.payment_methods.map(mode => {
                        return <Option key={mode.id.toString()} value={mode.id.toString()}>{mode.name}</Option>
                      })}
                    </Select>
                  </Form.Item>
                </Col>
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
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Street"
                    name="street"
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
              </Row>
              <Row gutter={24}>
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
                      {this.state.countries.map(function (item) {
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
              <Row gutter={24}>
                <Col xs={24} sm={24} md={124} lg={24} xl={24}>
                  <Typography.Title level={4}>Add Price & Test Type</Typography.Title>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <Form.List name="lab_pricing" initialValue={lab_pricing}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">

                            <Form.Item
                              {...restField}
                              name={[name, 'test_type']}
                              style={{ width: 180 }}
                              rules={[
                                {
                                  required: true,
                                  message: <IntlMessages id="admin.input.required" />,
                                },
                              ]}
                            >
                              <Select placeholder="Type Of Test">
                                {this.state.testTypes.map(test => {
                                  var optDisabled = false;
                                  /* if (lab_pricing.length > 0) {
                                    lab_pricing.map(i => {
                                      if (typeof i !== "undefined" && typeof i.test_type !== "undefined" && i.test_type == test.id.toString()) {
                                        optDisabled = true;
                                      }
                                    });
                                  } */
                                  return <Option key={test.id} value={test.id} disabled={optDisabled}>{test.name}</Option>
                                })}
                              </Select>
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'price']}
                              style={{ width: 100 }}
                              rules={[
                                {
                                  required: true,
                                  message: <IntlMessages id="admin.input.required" />,
                                }
                              ]}
                            >
                              <Input
                                style={{ width: "100%" }}
                                placeholder="Price per test"
                              />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'test_label']}
                              style={{ width: 200 }}
                            >
                              <Input placeholder="Test Label" />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'test_duration']}
                              style={{ width: 200 }}
                            >
                              <Input placeholder="Test Duration (e.g. 1 Hours, 30 Minutes)" />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'test_codes']}
                              style={{ width: 200 }}
                            >
                              <Input placeholder="Test Code" />
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add Pricing
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Typography.Title level={4}>Location</Typography.Title>
                </Col>
              </Row>
              <hr />
              <Row gutter={24}>
                <Col xs={24} sm={24}>
                  <Locator on_locate={this.setLatLong} cords={this.state.location} radius={this.state.lab && this.state.lab.radius ? this.state.lab.radius : this.state.minRadius} radius_input={this.radiusRef} defaultAddress={this.state.lab && this.state.lab.street ? this.state.lab.street : null} />
                </Col>
              </Row>
              <Row gutter={24} style={{ marginTop: 15 }}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Typography.Title level={4}>SFTP/FTP to upload results</Typography.Title>
                </Col>
              </Row>
              <hr />
              <Row gutter={24}>
                <Col xs={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Host"
                    name="ftp_host"
                    placeholder="e.g. http://domain.com or 192.168.0.1"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Port"
                    name="ftp_port"
                    placeholder="Default to 80"
                  >
                    <Input defaultValue={80} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Username"
                    name="ftp_username"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Password"
                    name="ftp_password"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Directory/Folder path on server"
                    name="ftp_folder_path"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
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
  return bindActionCreators({ ...labActions, ...adminActions, ...testsActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    AddLab
  )
);
