import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PlusCircleOutlined } from '@ant-design/icons';
import * as patientActions from "../../../redux/actions/patient-actions";
import * as paginationActions from "../../../redux/actions/pagination-actions";
import * as testsActions from "../../../redux/actions/tests-actions";
import * as adminActions from "../../../redux/actions/admin-actions";
import {
  Table,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Tooltip,
  Modal,
  Form,
  Select,
  Radio,
  Descriptions,
  Alert
} from "antd";
import { notifyUser } from "../../../services/notification-service";
import { EditOutlined, CloseOutlined, SearchOutlined, CheckCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
const { Option } = Select;
class PendingResults extends Component {
  constructor(props) {
    super(props);
    this.module = 'pending_results';
    this.resultsForm = React.createRef();
    this.state = {
      dataLoaded: false,
      loading: false,
      data: [],
      pagination: {
        hideOnSinglePage: true,
        showTotal: (total, range) => {
          return (
            <span>
              Showing {range[0]}-{range[1]}{" "}
              of {total}{" "}
              results
            </span>
          );
        },
        pageSize: 10,
        current: 1
      },
      filters: {},
      resultsModalVisible: false,
      resultsModalPatient: {},
      resultsModalValues: {}
    };
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  getSelectedFilterValue = (index) => {
    return this.props.paginginfo[this.module] && typeof this.props.paginginfo[this.module] !== "undefined" && this.props.paginginfo[this.module].filter && this.props.paginginfo[this.module].filter[index] || null;
  }

  getHeaderKeys = () => {
    return [
      {
        title: "First Name",
        dataIndex: "firstname",
        filteredValue: this.getSelectedFilterValue('firstname'),
        ...this.getColumnSearchProps("firstname")
      },
      {
        title: "Last Name",
        dataIndex: "lastname",
        filteredValue: this.getSelectedFilterValue('lastname'),
        ...this.getColumnSearchProps("lastname")
      },
      {
        title: "Email Address",
        dataIndex: "email",
        filteredValue: this.getSelectedFilterValue('email'),
        ...this.getColumnSearchProps("email")
      },
      {
        title: "Phone",
        dataIndex: "phone",
        filteredValue: this.getSelectedFilterValue('phone'),
        ...this.getColumnSearchProps("phone")
      },
      {
        title: "Scheduled Date/Time",
        dataIndex: "scheduled_date",
        render: (_text, row) => (
          <span>{row.scheduled_date}<br></br>{row.scheduled_time}</span>
        )
      },
      {
        title: "Test Selected",
        dataIndex: "test_type_name"
      },
      {
        title: "Actions",
        rowKey: "action",
        // width: "200px",
        render: (_text, record) => (
          <span>
            <Tooltip title="Edit Patient">
              <Button
                onClick={() => this.props.history.push("./edit/" + record.id)}
              >
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Enter Results">
              <Button
                type="primary"
                onClick={() => this.confirmEnterResults(record)}
                style={{ color: '#222' }}
              >
                <CheckCircleOutlined />
              </Button>
            </Tooltip>
          </span>
        )
      }
    ];
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            value={selectedKeys}
            onChange={e =>
              setSelectedKeys(e.target.value ? e.target.value.trimLeft() : "")
            }
            onPressEnter={() =>
              this.handleSearch(
                selectedKeys,
                confirm,
                dataIndex,
                clearFilters,
                setSelectedKeys
              )
            }
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() =>
              this.handleSearch(
                selectedKeys,
                confirm,
                dataIndex,
                clearFilters,
                setSelectedKeys
              )
            }
            disabled={selectedKeys != "" && selectedKeys !== null ? false : true}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button
            disabled={selectedKeys != "" && selectedKeys !== null ? false : true}
            onClick={() => this.handleReset(clearFilters, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      );
    },
    filterIcon: filtered => (
      <SearchOutlined fill={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    }
  });

  handleSearch = (
    selectedKeys,
    confirm,
    dataIndex,
    clearFilters,
    setSelectedKeys
  ) => {
    if (selectedKeys === "") {
      return false;
    }

    this.setState({ searchText: selectedKeys });
    let filters = this.state.filters;
    filters[dataIndex] = {
      val: selectedKeys,
      clearf: clearFilters,
      filter: true,
      setSelectedKeys: setSelectedKeys,
      confirm: confirm,
      auto: false
    };
    this.setState({ filters: filters });
    this.props.updateFilters({ module: this.module, filters: filters })
    confirm();
  };

  handleReset = (clearFilters, dataIndex) => {
    clearFilters();
    let filters = this.state.filters;
    if (filters[dataIndex]) {
      if (filters[dataIndex].setSelectedKeys && typeof filters[dataIndex].setSelectedKeys === 'function') {
        filters[dataIndex].setSelectedKeys("");
        //filters[dataIndex].confirm();
      }
    }
    if (filters[dataIndex] && !filters[dataIndex].auto) {
      delete this.props.paginginfo[this.module].filter[dataIndex];
      this.handleTableChange({ current: 1, pageSize: 10 }, this.props.paginginfo[this.module].filter, {});

    }
    filters[dataIndex] = { val: "", clearf: "", filter: false };
    this.setState({ filters: filters });
    this.props.updateFilters({ module: this.module, filters: filters })
    this.setState({ searchText: "" });
  };

  async componentDidMount() {
    if (this.props.paginginfo && this.props.currentModule !== "" && this.props.currentModule !== this.module) {
      this.props.clearPaginationExceptMe(this.module);
    } else {
      if (this.props.paginginfo && this.props.paginginfo[this.module]) {
        this.handleTableChange(this.props.paginginfo[this.module].pagination, this.props.paginginfo[this.module].filter, {}, true);
        if (this.props.paginginfo[this.module].filters) {
          let filters = this.props.paginginfo[this.module].filters
          Object.keys(filters).map(k => { filters[k].auto = false });
          this.setState({ filters: filters });
        }
      } else {
        this.handleTableChange({ current: 1, pageSize: 10 }, {}, {}, true);
      }
    }
  }

  deleteItem = id => {
    this.setState({ loading: true });
    this.props
      .deleteUser({ id: id })
      .then(item => {
        this.setState({ loading: false });
        this.props.history.push("./");
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  handleTableChange = (pagination, filters, sorter, manual) => {
    if (filters === undefined) filters = {};
    Object.keys(filters).map(key => { if ((!filters[key]) || (Array.isArray(filters[key]) && filters[key].length === 0)) { delete filters[key] } })
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    if (manual !== true) {
      this.props.updatePaginationRemoveOld({
        module: this.module, filter: filters,
        pagination: { current: pagination.current, pageSize: pagination.pageSize }
      })
    }
    this.setState({ loading: true });

    var patients_statuses = this.props.patient_status_list;
    var lab = JSON.parse(localStorage.getItem("lab"));
    var patientTypeFilter = { lab_assigned: lab.id };
    if (patients_statuses.length > 0) {
      var statusObj = patients_statuses.find(i => i.code == 'pending-results');
      patientTypeFilter["progress_status"] = statusObj.id;
    }
    this.props
      .getPatients({
        filters: { ...filters, ...patientTypeFilter },
        pagination: { page: pagination.current, pageSize: pagination.pageSize },
        sorter: sorter
      })
      .then(resp => {
        pager.total = resp.pagination.totalRecords;
        this.setState({
          loading: false,
          data: resp.data,
          pagination: pager
        });
      })
      .catch(ex => {
        this.setState({ loading: false });
      });
  };

  confirmEnterResults = async (patient) => {
    this.setState({ loading: true });
    await this.props.getPatientPricingInfo(patient.id, patient.pricing_id).then(async (response) => {
      if (response.status && response.status == true) {
        let _resultsModalValues = this.state.resultsModalValues;
        await this.props.getTestTypeMethods(response.data.test_type_id).then(async (resp1) => {
          if (resp1.status && resp1.status === true && resp1.data.length > 0) {
            _resultsModalValues.sample_collection_methods = resp1.data;
          }
        });
        _resultsModalValues.firstname = response.data.firstname;
        _resultsModalValues.lastname = response.data.lastname;
        _resultsModalValues.test_type = response.data.test_type;
        this.setState({
          resultsModalValues: _resultsModalValues,
          resultsModalPatient: patient
        }, () => {
          this.setState({ resultsModalVisible: true, loading: false });
        });
      } else {
        notifyUser("No pricing was found. Please check patient details and try again!", "error");
        this.resetResultsModal();
        this.setState({ loading: false });
      }
    });
  }

  enterResults = async(uploadToGovt) => {
    var formdata = this.resultsForm.current.getFieldsValue();
    if(typeof formdata.sample_collection_method !== 'undefined' && typeof formdata.result !== 'undefined'){
      var patients_statuses = this.props.patient_status_list;
      if (patients_statuses.length > 0) {
        this.setState({ loading: true });
        var statusObj = patients_statuses.find(i => i.code == 'completed');
        let args = { 
          sample_collection_method: formdata.sample_collection_method,
          result: formdata.result,
          result_text: formdata.result_text,
          lab_id: this.state.resultsModalPatient.lab_assigned_id,
          progress_status: statusObj.id,
          send_to_govt: uploadToGovt,
          confirmation_code: this.state.resultsModalPatient.confirmation_code
        };
        await this.props.savePatientResults(this.state.resultsModalPatient.id, args).then(response => {
          if (response.status && response.status == true) {
            notifyUser(response.message, "success");
            if (this.props.paginginfo && this.props.paginginfo[this.module]) {
              this.handleTableChange(this.props.paginginfo[this.module].pagination, this.props.paginginfo[this.module].filter, {}, true);
              if (this.props.paginginfo[this.module].filters) {
                let filters = this.props.paginginfo[this.module].filters
                Object.keys(filters).map(k => { filters[k].auto = false });
                this.setState({ filters: filters });
              }
            } else {
              this.handleTableChange({ current: 1, pageSize: 10 }, {}, {}, true);
            }
            this.resetResultsModal();
            this.setState({ loading: false });
          } else {
            if (response.message) {
              notifyUser(response.message, "error");
            } else {
              notifyUser("Unknown error. Please try again!", "error");
            }
            this.resetResultsModal();
            this.setState({ loading: false });
          }
        });
      } else {
        notifyUser("Something went wrong. Please refresh the page and try again.","error");
      }
    } else {
      notifyUser("Please fill all the required fields.","error");
    }
  }

  resetResultsModal = () => {
    this.setState({ resultsModalVisible: false, resultsModalPatient: {}, resultsModalValues: {} });
  }

  render() {
    let _state = this.state;
    let _this = this;
    let filtertag = Object.keys(this.state.filters).map(function (key1) {
      let keyLabel = _this.getHeaderKeys().find(el => el.dataIndex === key1);
      if (keyLabel.title.props && keyLabel.title.props.id) {
        keyLabel = keyLabel.title.props.id;
      } else {
        keyLabel = key1;
      }
      if (_state.filters[key1].filter) {
        return (
          <span>
            <Button
              key={key1}
              type="primary"
              onClick={() =>
                _this.handleReset(_state.filters[key1].clearf, key1)
              }
            >
              {keyLabel} : {_state.filters[key1].val}
              <CloseOutlined />
            </Button>
            &nbsp;
          </span>
        );
      }
    });

    return (
      <div className="gray-bg">
        <Modal
          title="Enter Patient Results"
          visible={this.state.resultsModalVisible}
          onCancel={() => this.setState({ resultsModalVisible: false, resultsModalPatient: {} })}
          footer={[
            <Button type="primary" onClick={() => this.enterResults(0)}>
              Save Results
            </Button>,
            <Button danger onClick={() => this.enterResults(1)}>
              Save Results and Upload to Govt.
            </Button>
          ]}
        >
          {this.state.resultsModalValues.firstname
            && this.state.resultsModalValues.lastname
            && this.state.resultsModalValues.test_type
            && this.state.resultsModalValues.sample_collection_methods ?
            <Form ref={this.resultsForm} layout="vertical" initialValues={this.state.resultsModalValues}>
              <Row>
                <Col>
                  <Descriptions style={{ width: '100%' }}>
                    <Descriptions.Item label={<strong>Patient Name</strong>}>
                      {this.state.resultsModalValues.firstname} {this.state.resultsModalValues.lastname}
                    </Descriptions.Item>
                  </Descriptions>
                  <Descriptions style={{ width: '100%' }}>
                    <Descriptions.Item label={<strong>Test Type</strong>}>
                      {this.state.resultsModalValues.test_type}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col style={{ width: '100%' }}>
                  <Form.Item label={<strong style={{fontSize:14}}>Specimen Collection Method</strong>} name="sample_collection_method" rules={[{required: true}]}>
                    <Select
                      showSearch
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.state.resultsModalValues.sample_collection_methods.map(function (item) {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.name} ({item.code})
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col style={{ width: '100%' }}>
                  <Form.Item label={<strong style={{fontSize:14}}>Result</strong>} name="result" rules={[{required: true}]}>
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="positive">Positive</Radio.Button>
                      <Radio.Button value="negative">Negative</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col style={{ width: '100%' }}>
                  <Form.Item label={<strong style={{fontSize:14}}>Result Comments</strong>} name="result_text">
                    <Input.TextArea rows={2} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            : <Alert message="No sample collection methods available for this lab." type="warning" />}
        </Modal>
        <Row gutter={24}>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography.Title level={4}>
              Pending Results
            </Typography.Title>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button
              type="primary"
              onClick={() => this.props.history.goBack()}
              className="right-fl def-blue"
            >
              <ArrowLeftOutlined />
              Back
            </Button>
          </Col>
        </Row>
        <hr />
        <Row gutter={24} style={{ marginBottom: "20px" }}>
          <Col xs={24}>{filtertag}</Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} style={{ overflowX: "auto" }}>
            <Table
              className="theme-table"
              columns={this.getHeaderKeys()}
              rowKey={record => record.id}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              loading={this.state.loading}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.pagination,
    ...state.language,
    ...state.adminConfig
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...adminActions, ...testsActions, ...patientActions, ...paginationActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    PendingResults
  )
);