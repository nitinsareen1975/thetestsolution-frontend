import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as testsActions from "../../../redux/actions/tests-actions";
import * as PricingActions from "../../../redux/actions/pricing-actions";
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
class AddPricing extends React.Component {
  formRef = React.createRef();
  state = {
    loading: true,
    dataLoaded: false,
    currency_codes: [],
    test_types: []
  };

  async componentDidMount() {
    var args = {
			filters: {status: 1},
			pagination: {},
			sorter: {}
		}
    let currency_codes = await this.props.getCurrencyCodes();
    let test_types = await this.props.getTestTypes(args);
    this.setState({
      loading: false,
      currency_codes: currency_codes,
      test_types: test_types.status ? test_types.data : [],
      dataLoaded: true
    });
  }

  handleSubmit = async (data) => {
    this.setState({ loading: true });
    this.props.addPricing(data).then(async (response) => {
      if (response.status && response.status === true) {
        notifyUser(response.message, "success");
        this.props.history.push("../pricing");
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
            <Typography.Title level={4}>Add Pricing</Typography.Title>
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
                    label="Pricing Title"
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
                {/* <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    name="description"
                    label="Description"
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Col> */}
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    name="test_type"
                    label="Test Type"
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
                      {this.state.test_types.map(function (item) {
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
                    name="test_duration"
                    label="Test Duration"
                    rules={[
                      {
                        required: true,
                        message: <IntlMessages id="admin.input.required" />,
                      }
                    ]}
                  >
                    <Input placeholder="e.g.: 4 hours, 4-6 hours"/>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    name="raw_price"
                    label="Raw Price"
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
                    name="retail_price"
                    label="Retail Price"
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
                    name="currency"
                    label="Currency"
                    rules={[
                      {
                        required: true,
                        message: <IntlMessages id="admin.input.required" />,
                      }
                    ]}
                  >
                    <Select
                      showSearch
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      style={{ width: "100%" }}
                    >
                      {this.state.currency_codes.map(function (item) {
                        return (
                          <Option key={item.currency_code.toString()} value={item.currency_code.toString()}>
                            {item.currency_code}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <Form.Item
                    {...formItemLayout}
                    label="Can use for walk-in customers?"
                    name="is_walkin_price"
                  >
                    <Switch
                      checkedChildren={"Active"}
                      unCheckedChildren={"Inactive"}
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
  return { ...state.adminConfig, ...state.countries };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...testsActions, ...PricingActions, ...adminActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    AddPricing
  )
);
