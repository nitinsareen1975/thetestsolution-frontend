import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as testsActions from "../../../redux/actions/tests-actions";
import * as adminActions from "../../../redux/actions/admin-actions";
import { notifyUser } from "../../../services/notification-service";
import {
  Typography,
  Form,
  Input,
  Button,
  Row,
  Col,
  Spin,
  Switch,
  InputNumber,
  Space,
  Select,
  Empty
} from "antd";
import IntlMessages from "../../../services/intlMesseges";
import { ArrowLeftOutlined, SaveOutlined, LinkOutlined } from "@ant-design/icons";
const { Option } = Select;
class AddTestType extends React.Component {
  formRef = React.createRef();
  state = {
    loading: true,
    dataLoaded: false,
    test_type: {},
    test_type_methods: [],
    test_type_names: []
  };

  async componentDidMount() {
    var test_type = await this.props.getTestType(this.props.match.params.id);
    if (test_type.status) {
      test_type.data.observation_methods = test_type.data.observation_methods != null ? test_type.data.observation_methods.split(",") : [];
    }
    var _test_type_methods = await this.props.getTestTypeMethods();
    var test_type_names = await this.props.getTestTypeNames({});
    this.setState({
      loading: false,
      test_type: test_type.status ? test_type.data : {},
      test_type_methods: _test_type_methods.status === true ? _test_type_methods.data : [],
      test_type_names: test_type_names.data,
      dataLoaded: true
    });
  }

  handleSubmit = async (data) => {
    data.observation_methods = data.observation_methods.join(",");
    this.setState({ loading: true });
    this.props.updateTestType(this.props.match.params.id, data).then(async (response) => {
      if (response.status && response.status === true) {
        notifyUser(response.message, "success");
        this.props.history.push("../../test-types");
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
            <Typography.Title level={4}>Edit Test</Typography.Title>
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
            {this.state.test_type.id ?
              <Form initialValues={this.state.test_type} layout="vertical" onFinish={this.handleSubmit}>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="name"
                      label="TestName"
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
                      name="test_type"
                      label="Type"
                      rules={[
                        {
                          required: true,
                          message: <IntlMessages id="admin.input.required" />,
                        }
                      ]}
                    >
                      <Select
                        style={{ width: "100%" }}
                      >
                        {this.state.test_type_names.map(function (item) {
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
                    <Form.Item
                      {...formItemLayout}
                      name="test_procedure"
                      label="Procedure"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  {/* <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    name="test_procedure_snomed"
                    label="Procedure Snomed"
                    rules={[
                      {
                        required: true,
                        message: <IntlMessages id="admin.input.required" />,
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col> */}
                  {/* <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    name="testing_platform"
                    label="Testing Platform"
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
                    name="cost"
                    label="Cost"
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
                    name="price"
                    label="Price"
                    rules={[
                      {
                        required: true,
                        message: <IntlMessages id="admin.input.required" />,
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col> */}
                  {/* <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Test Code"
                    name="code"
                  >
                    <Input />
                  </Form.Item>
                </Col> */}
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="Gender"
                      name="gender"
                    >
                      <Select>
                        <Option key="Male" value="Male">Male</Option>
                        <Option key="Female" value="Female">Female</Option>
                        <Option key="Both" value="Both">Both</Option>
                        <Option key="Undefined" value="Undefined">Undefined</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="loinc"
                      label="LOINC"
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
                      name="loinc_desc"
                      label="LOINC Description"
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="fi_test_name"
                      label="FI Test Name"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="fi_test_type"
                      label="FI Test Type"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="fi_model"
                      label="FI Model or Component"
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
                      name="kit_device"
                      label="KIT^device^IDType"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  {/* <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    name="estimated_hours"
                    label="Estimated Time "
                    style={{ float: 'left', marginRight: "5px" }}
                  >
                    <InputNumber min={0} defaultValue="00" max={59} style={{ width: 60 }} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    name="estimated_minutes"
                    label=" (HH:MM:SS)"
                    style={{ float: 'left', width: 95 }}
                  >
                    <InputNumber min={0} defaultValue="00" max={59} style={{ width: 60 }} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    name="estimated_seconds"
                    label=" "
                    style={{ float: 'left' }}
                  >
                    <InputNumber min={0} defaultValue="00" max={59} style={{ width: 60 }} />
                  </Form.Item>
                </Col> */}

                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="Units"
                      name="units"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="Range Type"
                      name="range_type"
                    >
                      <Select>
                        <Option key="Year" value="Year">Year</Option>
                        <Option key="Month" value="Month">Month</Option>
                        <Option key="Week" value="Week">Week</Option>
                        <Option key="Day" value="Day">Day</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="Range (Min.)"
                      name="range_min"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="Range (Max.)"
                      name="range_max"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="Reference (Min.)"
                      name="ref_min"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="Reference (Max.)"
                      name="ref_max"
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="Panic (Min.)"
                      name="panic_min"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="Panic (Max.)"
                      name="panic_max"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="Is rapid test?"
                      name="is_rapid_test"
                    >
                      <Switch
                        checkedChildren={"Active"}
                        unCheckedChildren={"Inactive"}
                        defaultChecked={this.state.test_type.is_rapid_test == 1 ? true : false}
                      />
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
                        defaultChecked={this.state.test_type.status == 1 ? true : false}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Typography.Title level={5}>
                      CSV Fields
                    </Typography.Title>
                  </Col>
                </Row>
                <hr />
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="test_type_csv"
                      label="Type - CSV"
                      rules={[
                        {
                          required: true,
                          message: <IntlMessages id="admin.input.required" />,
                        }
                      ]}
                    >
                      <Select
                        style={{ width: "100%" }}
                      >
                        {this.state.test_type_names.map(function (item) {
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
                    <Form.Item
                      {...formItemLayout}
                      name="loinc_csv"
                      label="LOINC - CSV"
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
                      name="fi_test_name_csv"
                      label="FI Test Name - CSV"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="fi_model_csv"
                      label="FI Model or Component - CSV"
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
                </Row>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Typography.Title level={4}>
                      Observation Definitions
                      <Button type="link" onClick={() => this.props.history.push("../../test-type-methods")} icon={<LinkOutlined />}>Manage Definitions</Button>
                    </Typography.Title>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col xs={24}>
                    <Form.Item
                      {...formItemLayout}
                      label="Specimen Collection Methods"
                      name="observation_methods"
                      rules={[
                        {
                          required: true,
                          message: <IntlMessages id="admin.input.required" />,
                        }
                      ]}
                    >
                      <Select
                        mode="multiple"
                        showSearch
                        size="large"
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        style={{ width: "100%" }}
                      >
                        {this.state.test_type_methods.map((item) => {
                          return (
                            <Option key={item.id.toString()} value={item.id.toString()}>
                              {item.name} ({item.code})
                            </Option>
                          );
                        })}
                      </Select>
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
                        <IntlMessages id="admin.userlisting.update" />
                        <SaveOutlined />
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              : <Empty />}
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
  return bindActionCreators({ ...testsActions, ...adminActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    AddTestType
  )
);
