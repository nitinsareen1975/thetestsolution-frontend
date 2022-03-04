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
  Select
} from "antd";
import IntlMessages from "../../../services/intlMesseges";
import { ArrowLeftOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
const { Option } = Select;
class AddTestType extends React.Component {
  formRef = React.createRef();
  state = {
    loading: true,
    dataLoaded: false,
    test_type: {},
    test_type_methods: []
  };

  async componentDidMount() {
    this.setState({
      loading: false,
      dataLoaded: true
    });
  }

  handleSubmit = async (data) => {
    this.setState({ loading: true });
    this.props.addTestType(data).then(async (response) => {
      if (response.status && response.status === true) {
        if (data.test_type_methods && data.test_type_methods.length > 0) {
          await this.props.updateTestTypeMethods(response.data.id, { methods: data.test_type_methods }).then(res => {
            if (!res.status || res.status === false) {
              if (res.message) {
                notifyUser(res.message, "error");
              } else {
                notifyUser("Observation definition was not updated!", "error");
              }
            }
          });
        }
        notifyUser(response.message, "success");
        this.props.history.push("../test-types");
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

  onValuesChange = (changedFields, allFields) => {
    this.setState({ test_type_methods: allFields.test_type_methods })
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
    var test_type_methods = this.state.test_type_methods;
    if (test_type_methods.length > 0 && typeof test_type_methods[0] === "undefined") {
      test_type_methods = [];
    }
    return (
      <div>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Typography.Title level={4}>Add Test Type</Typography.Title>
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
                    label="Test Type Name"
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
                    name="test_procedure"
                    label="Procedure"
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
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
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
              </Row>
              <Row gutter={24}>
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
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    name="loinc"
                    label="LOINC"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    name="test_type"
                    label="Test Type"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
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
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
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
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Test Code"
                    name="code"
                  >
                    <Input />
                  </Form.Item>
                </Col>
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
              </Row>
              <Row gutter={24}>
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
              </Row>
              <Row gutter={24}>
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
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Typography.Title level={4}>Observation Definitions</Typography.Title>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <Form.List name="test_type_methods" initialValue={test_type_methods}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">

                            <Form.Item
                              {...restField}
                              name={[name, 'name']}
                              style={{ width: 300 }}
                              rules={[
                                {
                                  required: true,
                                  message: <IntlMessages id="admin.input.required" />,
                                }
                              ]}
                            >
                              <Input
                                style={{ width: "100%" }}
                                placeholder="Display Name"
                              />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'code']}
                              style={{ width: 300 }}
                              rules={[
                                {
                                  required: true,
                                  message: <IntlMessages id="admin.input.required" />,
                                }
                              ]}
                            >
                              <Input placeholder="Code" />
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add Definition
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
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
                      <PlusOutlined />
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
  return bindActionCreators({ ...testsActions, ...adminActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    AddTestType
  )
);
