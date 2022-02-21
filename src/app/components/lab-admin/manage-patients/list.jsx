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
  Modal
} from "antd";
import { notifyUser } from "../../../services/notification-service";
import { EditOutlined, CloseOutlined, SearchOutlined, ImportOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import moment from "moment";

class AllPatients extends Component {
  constructor(props) {
    super(props);
    this.module = 'patients';
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
      checkInModalVisible: false,
      checkInPatientId: 0
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
          <span>{row.scheduled_date}<br></br>{moment(row.scheduled_time).format("hh:mm a")}</span>
        )
      },
      {
        title: "Confirmation Code",
        dataIndex: "confirmation_code"
      },
      {
        title: "Actions",
        rowKey: "action",
        width: 130,
        render: (_text, record) => (
          <span>
            <Tooltip title="Edit Patient">
              <Button
                onClick={() => this.props.history.push("./patients/edit/" + record.id)}
              >
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Check In Patient">
              <Button
                type="primary"
                onClick={() => this.confirmCheckInPatient(record.id)}
                style={{ color: '#222' }}
              >
                <ImportOutlined />
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
    var patientTypeFilter = {lab_assigned: lab.id};
    if (patients_statuses.length > 0) {
      var statusObj = patients_statuses.find(i => i.code == 'scheduled');
      patientTypeFilter["progress_status"] = statusObj.id;
    }
    this.props
      .getScheduledPatients({
        filters: {...filters, ...patientTypeFilter},
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

  confirmCheckInPatient = (id) => {
    this.setState({
      checkInPatientId: id
    }, () => {
      this.setState({ checkInModalVisible: true });
    });
  }

  checkInPatient = async (id) => {
    var patients_statuses = this.props.patient_status_list;
    if (patients_statuses.length > 0) {
      var statusObj = patients_statuses.find(i => i.code == 'checked-in');
      await this.props.updatePatient(id, { progress_status: statusObj.id }).then(response => {
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
          this.setState({ checkInModalVisible: false, checkInPatientId: 0 });
        } else {
          if (response.message) {
            notifyUser(response.message, "error");
          } else {
            notifyUser("Unknown error. Please try again!", "error");
          }
          this.setState({ checkInModalVisible: false, checkInPatientId: 0, loading: false });
        }
      });
    }
  }

  editPatientInfo = () => {
    this.props.history.push("./patients/edit/" + this.state.checkInPatientId, { showCheckIn: true });
  }

  checkinWithoutEdit = () => {
    if (this.state.checkInPatientId > 0) {
      this.checkInPatient(this.state.checkInPatientId);
    } else {
      this.setState({ checkInModalVisible: false });
    }
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
          title="Please confirm"
          visible={this.state.checkInModalVisible}
          onOk={this.editPatientInfo}
          onCancel={() => this.setState({ checkInModalVisible: false, checkInPatientId: 0 })}
          footer={[
            <Button type="primary" onClick={this.editPatientInfo}>
              Yes, Edit and CheckIn
            </Button>,
            <Button type="default" onClick={this.checkinWithoutEdit}>
              No, CheckIn without editing
            </Button>
          ]}
        >
          <p>Do you want to edit patient info before checkin?</p>
        </Modal>
        <Row gutter={24}>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography.Title level={4}>
              Scheduled Patients
            </Typography.Title>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button
              style={{ marginLeft: 10}}
              type="primary"
              onClick={() => this.props.history.goBack()}
              className="right-fl def-blue"
            >
              <ArrowLeftOutlined />
              Back
            </Button>
            <Button
              type="primary"
              onClick={() => this.props.history.push("./patients/add")}
              className="right-fl def-blue"
            >
              Add New
              <PlusCircleOutlined />
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
    AllPatients
  )
);