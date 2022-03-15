import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PlusCircleOutlined } from '@ant-design/icons';
import * as patientActions from "../../../redux/actions/patient-actions";
import * as paginationActions from "../../../redux/actions/pagination-actions";
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
  Spin,
  Select
} from "antd";
import { notifyUser } from "../../../services/notification-service";
import { EditOutlined, CloseOutlined, SearchOutlined, FilePdfOutlined, ArrowLeftOutlined, ClockCircleOutlined } from '@ant-design/icons';
import moment from "moment";
const { Option } = Select;

class CheckedinList extends Component {
  constructor(props) {
    super(props);
    this.module = 'checkedin_list';
    this.sampleForm = React.createRef();
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
      modalLoading: false,
      checkInModalVisible: false,
      checkInPatientId: 0,
      checkInModalValues: {
        observationMethods: []
      }
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
          <span>{moment(row.scheduled_date).format("MM/DD/YYYY")}<br></br>{moment(row.scheduled_time).format("H:m:s a")}</span>
        )
      },
      {
        title: "Test Selected",
        dataIndex: "test_type_name"
      },
      {
        title: "Test Price",
        dataIndex: "retail_price",
        render: (_text, row) => (
          <span>{row.is_lab_collected == 1 ? "Lab Collected" : row.currency+""+row.retail_price}</span>
        )
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
            <Tooltip title="Print Patient Form">
              <Button
                type="primary"
                onClick={() => this.printPatientForm(record.id)}
                style={{ color: '#222' }}
              >
                <FilePdfOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Save Samples Collected">
              <Button
                type="primary"
                onClick={() => this.confirmSamplesCollected(record.id)}
                style={{ color: '#222' }}
              >
                <ClockCircleOutlined />
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
      var statusObj = patients_statuses.find(i => i.code == 'checked-in');
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

  printPatientForm = (patientId) => {
    window.open("/print-patient-form/" + patientId, "_blank");
  }

  confirmSamplesCollected = async (patientId) => {
    this.setState({ loading: true });
    await this.props.getTestTypeMethodsForPatient(patientId).then(async (response) => {
      if (response.status && response.status == true) {
        let _checkInModalValues = {};
        _checkInModalValues.observationMethods = response.data;
        this.setState({
          checkInModalValues: _checkInModalValues,
          checkInModalVisible: true,
          checkInPatientId: patientId,
          loading: false
        });
      } else {
        notifyUser("No observation methods were found. Please check the test type details and try again!", "error");
        this.resetCheckinModal();
        this.setState({ loading: false });
      }
    });
  }

  samplesCollected = async () => {
    var patients_statuses = this.props.patient_status_list;
    if (patients_statuses.length > 0) {
      var statusObj = patients_statuses.find(i => i.code == 'pending-results');
      var _specimen_type = "";
      var _specimen_collection_method = "";
      var formvalues = this.sampleForm.current.getFieldsValue();
      if (typeof formvalues.specimen_type !== "undefined") {
        _specimen_type = formvalues.specimen_type;
        _specimen_collection_method = formvalues.specimen_collection_method;
      }
      this.setState({ modalLoading: true });
      var args = {
        progress_status: statusObj.id,
        specimen_type: _specimen_type,
        specimen_collection_method: _specimen_collection_method,
        specimen_collection_date: moment().format("YYYY-MM-DD")
      };
      await this.props.updatePatient(this.state.checkInPatientId, args).then(response => {
        if (response.status && response.status == true) {
          this.setState({ modalLoading: false });
          this.resetCheckinModal();
          notifyUser("Patient moved to Pending Results.", "success");
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
        } else {
          if (response.message) {
            notifyUser(response.message, "error");
          } else {
            notifyUser("Unknown error. Please try again!", "error");
          }
          this.setState({ modalLoading: false });
        }
      });
    } else {
      notifyUser("Patient status list not found. Please refresh the page and try again.", "error");
      this.resetCheckinModal();
    }
  }

  resetCheckinModal = () => {
    var _checkInModalValues = {
      observationMethods: []
    };
    this.setState({
      checkInModalVisible: false,
      checkInModalValues: _checkInModalValues,
      checkInPatientId: 0,
      modalLoading: false
    });
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
          title="Enter sample collection data"
          visible={this.state.checkInModalVisible}
          onOk={this.samplesCollected}
          onCancel={() => this.setState({ checkInModalVisible: false, checkInPatientId: 0 })}
          footer={[
            <Button type="primary" onClick={this.samplesCollected}>
              Save and move to Pending Results
            </Button>
          ]}
        >
          <Spin spinning={this.state.modalLoading}>
            <Form ref={this.sampleForm} layout="vertical">
              <Row>
                <Col style={{ width: '100%' }}>
                  <Form.Item label={<strong style={{ fontSize: 14 }}>Specimen Collection Method</strong>} name="specimen_collection_method" rules={[{ required: true }]}>
                    <Select
                      style={{ width: "100%" }}
                    >
                      {this.state.checkInModalValues.observationMethods.length > 0 && this.state.checkInModalValues.observationMethods.map(function (item) {
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
                <Col style={{ width: '100%' }}>
                  <Form.Item label={<strong style={{ fontSize: 14 }}>Type of Specimen</strong>} name="specimen_type">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Modal>
        <Row gutter={24}>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography.Title level={4}>
              Checked In List
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
  return bindActionCreators({ ...adminActions, ...patientActions, ...paginationActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    CheckedinList
  )
);