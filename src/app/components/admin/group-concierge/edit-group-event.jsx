import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as GroupConciergeActions from "../../../redux/actions/group-concierge-actions";
import * as adminActions from "../../../redux/actions/admin-actions";
import * as TestsActions from "../../../redux/actions/tests-actions";
import * as LabsActions from "../../../redux/actions/lab-actions";
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
  InputNumber,
  Tabs,
  Upload,
  Empty
} from "antd";
import IntlMessages from "../../../services/intlMesseges";
import { ArrowLeftOutlined, UploadOutlined, SaveOutlined, DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import Config from "../../../config";
const { TabPane } = Tabs;
const { Option } = Select;

class EditGroupEvent extends React.Component {
  formRef = React.createRef();
  radiusRef = React.createRef();
  state = {
    loading: true,
    dataLoaded: false,
    event_agreement: null,
    testTypes: [],
    labs: [],
    countries: [],
    lab_pricing: [],
    minRadius: 50,
    defaultPaymentMethod: "credit-card",
    agreementRemoved: false,
    event: {}
  };

  async componentDidMount() {
    var _countries = [];
    if (typeof this.props.countries === "undefined" || this.props.countries.length <= 0) {
      _countries = await this.props.getCountries();
    } else {
      _countries = this.props.countries;
    }
    var _testTypes = await this.props.getTestTypes({});
    var _labs = await this.props.getLabs({});
    var _event = await this.props.getGroupEvent(this.props.match.params.id);
    if (_event.data.event_date != null) {
      _event.data.event_date = moment(_event.data.event_date);
    }
    if (_event.data.event_time != null) {
      _event.data.event_time = moment(_event.data.event_time);
    }
    this.setState({
      loading: false,
      countries: _countries,
      testTypes: _testTypes.data,
      labs: _labs.data,
      event: _event.data,
      defaultPaymentMethod: _event.data.payment_method,
      event_agreement: _event.data.event_agreement !== "" && _event.data.event_agreement !== null ? Config.DASHBOARD_URL + _event.data.event_agreement : "",
      dataLoaded: true
    });
  }

  handleSubmit = async (data) => {
    if (typeof data.event_date !== "undefined") {
      data.event_date = moment(data.event_date).format("YYYY-MM-DD");
    }
    if (typeof data.event_time !== "undefined") {
      data.event_time = moment(data.event_time).format("YYYY-MM-DD HH:mm");
    }
    data.payment_method = this.state.defaultPaymentMethod;

    var args = {};
    for (const key in data) {
      if (key !== "event_agreement") {
        if (typeof data[key] === "undefined") {
          data[key] = "";
        }
        args[key] = data[key];
      }
    }

    if (this.state.agreementRemoved === true) {
      args['event_agreement'] = "";
    }
    if (typeof this.state.event_agreement !== "undefined" && this.state.event_agreement !== null && typeof this.state.event_agreement !== "string" && this.state.event_agreement.name) {
      const formData = new FormData();
      formData.append('event_agreement', this.state.event_agreement);
      await this.props.uploadGroupEventAgreement(formData).then((response) => {
        if (response.status && response.status === true) {
          args['event_agreement'] = response.data;
        }
      });
    }
    this.setState({ loading: true });
    await this.props.updateGroupEvent(this.props.match.params.id, args).then(async (response) => {
      if (response.status && response.status === true) {
        notifyUser(response.message, "success");
        this.props.history.push("../../group-events");
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
      /* accept: accept, */
      multiple: false,
      beforeUpload: file => {
        /* if (file.type.indexOf('image/') === -1) {
          message.error(<IntlMessages id="admin.fileupload.acceptedtypes" />);
          _this.setState({ [field]: null });
        } else { */
        _this.setState({ [field]: file });
        /* } */
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

  onChangePaymentMethod = (key) => {
    this.setState({ defaultPaymentMethod: key });
  }

  removeGroupEventAgreement(id) {
    this.props.removeGroupEventAgreement({ event_id: id }).then((response) => {
      if (response.status && response.status === true) {
        this.setState({ event_agreement: null, agreementRemoved: true });
      }
    });
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
            <Typography.Title level={4}>Edit Group Event</Typography.Title>
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
            {this.state.event.id ?
              <Form ref={this.formRef} layout="vertical" initialValues={this.state.event} onFinish={this.handleSubmit}>
                <Row gutter={24}>
                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="name"
                      label="Event Name"
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
                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="event_date"
                      label="Event Date"
                      rules={[
                        {
                          required: true,
                          message: <IntlMessages id="admin.input.required" />,
                        }
                      ]}
                    >
                      <DatePicker format={"MM/DD/YYYY"} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="event_time"
                      label="Event Time"
                      rules={[
                        {
                          required: true,
                          message: <IntlMessages id="admin.input.required" />,
                        }
                      ]}
                    >
                      <DatePicker.TimePicker use12Hours format={"HH:mm A"} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="number_of_persons"
                      label="Total number of individuals to be tested"
                      rules={[
                        {
                          required: true,
                          message: <IntlMessages id="admin.input.required" />,
                        }
                      ]}
                    >
                      <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      name="address"
                      label="Address"
                      rules={[
                        {
                          required: true,
                          message: <IntlMessages id="admin.input.required" />,
                        }
                      ]}
                    >
                      <Input.TextArea rows={2} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="test_type"
                      label="Type of Test"
                      rules={[
                        {
                          required: true,
                          message: <IntlMessages id="admin.input.required" />,
                        }
                      ]}
                    >
                      <Select>
                        {this.state.testTypes && this.state.testTypes.length > 0 && this.state.testTypes.map(row => {
                          return <Option key={row.id.toString()} value={row.id.toString()}>{row.name}</Option>
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="rate_per_test"
                      label="Group Rate per Test ($)"
                      rules={[
                        {
                          required: true,
                          message: <IntlMessages id="admin.input.required" />,
                        }
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="lab_location"
                      label="Lab Selected"
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
                        style={{ width: '100%' }}
                      >
                        {this.state.labs.length > 0 && this.state.labs.map(function (lab) {
                          return (
                            <Option key={lab.id} value={lab.id}>
                              {lab.name} ({lab.street}, {lab.city}, {lab.state}, {lab.zip})
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="Event Information and Payment agreement form"
                      name="event_agreement"
                    /* rules={[
                      {
                        required: true,
                        message: <IntlMessages id="admin.input.required" />,
                      }
                    ]} */
                    >
                      <Upload {...this.uploaderProps('event_agreement', '*')}>
                        <Button>
                          <UploadOutlined /> <IntlMessages id="admin.select.uploadfile" />
                        </Button>
                      </Upload>
                      {this.state.event_agreement !== null && this.state.event_agreement !== "" && typeof this.state.event_agreement === "string" ?
                        <span>
                          {this.state.event_agreement.replace(/^.*[\\\/]/, '')}
                          <Button type="link" onClick={() => window.open(this.state.event_agreement, '_blank')}><DownloadOutlined /></Button>
                          <Button type="link" onClick={() => this.removeGroupEventAgreement(this.state.event.id)}><DeleteOutlined /></Button>
                        </span>
                        : ""}
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="Status"
                      name="status"
                    >
                      <Switch
                        defaultChecked={this.state.event.status == 1}
                        checkedChildren={"Active"}
                        unCheckedChildren={"Inactive"}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Typography.Title level={4}>Primary Contact (Guarantor) Information</Typography.Title>
                  </Col>
                </Row>
                <hr />
                <Row gutter={24}>
                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="contact_person_name"
                      label="Primary Contact Name"
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
                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="contact_person_phone"
                      label="Primary Contact Phone#"
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
                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Form.Item
                      {...formItemLayout}
                      name="contact_person_email"
                      label="Email Address"
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
                <Row gutter={24} style={{ marginTop: 15 }}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Typography.Title level={4}>Payment Information</Typography.Title>
                  </Col>
                </Row>
                <hr />
                <Row gutter={24}>
                <Col xs={24} sm={8} md={6}>
                    <Form.Item
                      {...formItemLayout}
                      label="Payment Amount"
                      name="payment_amount"
                      rules={[
                        {
                          required: true,
                          message: <IntlMessages id="admin.input.required" />,
                        }
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        controls={false}
                        disabled={true}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col xs={24}>
                    <Tabs defaultActiveKey={this.state.defaultPaymentMethod} onChange={this.onChangePaymentMethod}>
                      <TabPane tab={<strong>Credit Card</strong>} key="credit_card">
                        <Row gutter={24}>
                          <Col xs={24} md={6} lg={6} xl={6}>
                            <Form.Item
                              {...formItemLayout}
                              label="Transaction/Ref #"
                              name="transaction_id"
                            >
                              <Input disabled={true} />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={6} lg={6} xl={6}>
                            <Form.Item
                              {...formItemLayout}
                              label="Amount Paid"
                            >
                              <h3>${this.state.event.payment_amount > 0 ? this.state.event.payment_amount : "0.00"}</h3>
                            </Form.Item>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tab={<strong>Cheque</strong>} key="cheque">
                        <Row gutter={24}>
                          <Col xs={24} md={6} lg={6} xl={6}>
                            <Form.Item
                              {...formItemLayout}
                              label="Cheque Number"
                              name="cheque_number"
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                      </TabPane>
                    </Tabs>
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
  return bindActionCreators({ ...GroupConciergeActions, ...TestsActions, ...adminActions, ...LabsActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    EditGroupEvent
  )
);
