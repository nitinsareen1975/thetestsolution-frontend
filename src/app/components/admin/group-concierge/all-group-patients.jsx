import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PlusCircleOutlined } from '@ant-design/icons';
import * as patientActions from "../../../redux/actions/patient-actions";
import * as paginationActions from "../../../redux/actions/pagination-actions";
import * as adminActions from "../../../redux/actions/admin-actions";
import * as labsActions from "../../../redux/actions/lab-actions";
import * as GroupConciergeActions from "../../../redux/actions/group-concierge-actions";
import {
  Table,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Tooltip,
  Tag,
  Select
} from "antd";
import { notifyUser } from "../../../services/notification-service";
import IntlMessages from "../../../services/intlMesseges";
import { EditOutlined, CloseOutlined, SearchOutlined, ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import moment from "moment";
const { Option } = Select;
class AllPatients extends Component {
  constructor(props) {
    super(props);
    this.module = 'all_patients';
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
      customFilters: {
        group_id:[]
      },
      tagColors: ['red', 'volcano', 'gold', 'cyan', 'green', 'blue', 'gold'],
      labs: [],
      events_list: []
    };
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  getSelectedFilterValue = (index) => {
    return this.props.paginginfo[this.module] && typeof this.props.paginginfo[this.module] !== "undefined" && this.props.paginginfo[this.module].filter && this.props.paginginfo[this.module].filter[index] || null;
  }

  getHeaderKeys = () => {
    return [
      {
        title: "Group Event",
        dataIndex: "event_name"
      },
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
          <span>{moment(row.scheduled_date).format("MM/DD/YYYY")}<br></br>{moment(row.scheduled_time).format("hh:mm a")}</span>
        )
      },
      {
        title: "Status",
        render: (_text, record) => {
          var statusStr = "--";
          var tagColor = this.state.tagColors[1];
          if (typeof this.props.patient_status_list !== "undefined" && this.props.patient_status_list.length > 0 && record.progress_status != null) {
            var statusObj = this.props.patient_status_list.find(l => l.id == record.progress_status);
            if (typeof statusObj.name !== "undefined") {
              statusStr = statusObj.name;
              tagColor = this.state.tagColors[record.progress_status];
            }
          }
          return <Tag color={tagColor}>{statusStr}</Tag>
        }
      },
      {
        title: "Actions",
        rowKey: "action",
        // width: "200px",
        render: (_text, record) => (
          <span>
            <Tooltip title="Edit Patient">
              <Button
                onClick={() => this.props.history.push("./group-patients/edit/" + record.id)}
              >
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Complete Registration">
              <Button
                onClick={() => this.completeRegistration(record.id, record.group_id)}
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
      this.handleTableChange({ current: 1, pageSize: 10 }, {...this.props.paginginfo[this.module].filter,...this.state.customFilters}, {});

    }
    filters[dataIndex] = { val: "", clearf: "", filter: false };
    this.setState({ filters: filters });
    this.props.updateFilters({ module: this.module, filters: filters })
    this.setState({ searchText: "" });
  };

  async componentDidMount() {
    this.setState({ loading: true });
    var historyState = this.props.history.location.state;
    var historyStateObj = this.state.customFilters;
    if(typeof historyState !== "undefined" && typeof historyState.group_id !== "undefined"){
      historyStateObj.group_id = [historyState.group_id.toString()];
    }
    this.setState({ customFilters: historyStateObj });
    
    var args = {
			filters: {},
			pagination: {},
			sorter: {column: "name", order: "asc"}
		}
    var events = await this.props.getGroupEvents(args);
    if(events.status && events.status === true){
      this.setState({ events_list: events.data });
    }
    var labs = await this.props.getLabs(args);
    if(labs.status && labs.status === true){
      this.setState({ labs: labs.data });
    }
    if (this.props.paginginfo && this.props.currentModule !== "" && this.props.currentModule !== this.module) {
      this.props.clearPaginationExceptMe(this.module);
    }
    if (this.props.paginginfo && this.props.paginginfo[this.module]) {
      this.handleTableChange(this.props.paginginfo[this.module].pagination, {...this.props.paginginfo[this.module].filter,...this.state.customFilters}, {}, true);
      if (this.props.paginginfo[this.module].filters) {
        let filters = this.props.paginginfo[this.module].filters
        Object.keys(filters).map(k => { filters[k].auto = false });
        this.setState({ filters: filters });
      }
    } else {
      this.handleTableChange({ current: 1, pageSize: 10 }, this.state.customFilters, {}, true);
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
    var customFilter = { progress_status: 1 };
    this.props
      .getGroupPatients({
        filters:  { ...filters, ...customFilter },
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

  onCustomFilter = (filterKey, filterValue) => {
    this.setState({ filters: {} });
    this.props.clearFilters(this.module);
    this.props.clearPagination(this.module);
    var filtersMain = {...this.state.customFilters, [filterKey]: filterValue };
    if (this.props.paginginfo && this.props.paginginfo[this.module]) {
      this.handleTableChange(this.props.paginginfo[this.module].pagination, filtersMain, {}, true);
      if (this.props.paginginfo[this.module].filters) {
        let filters = this.props.paginginfo[this.module].filters
        Object.keys(filters).map(k => { filters[k].auto = false });
        this.setState({ filters: filters });
      }
    } else {
      this.handleTableChange({ current: 1, pageSize: 10 }, filtersMain, {}, true);
    }
    this.setState({ customFilters: filtersMain });
  }
 
  completeRegistration = async (pid, group_id) => {
    await this.props.completeRegistration(pid, group_id).then(response => {
      if (response.status && response.status == true) {
        notifyUser(response.message, "success");
        if (this.props.paginginfo && this.props.paginginfo[this.module]) {
          this.handleTableChange(this.props.paginginfo[this.module].pagination, {...this.props.paginginfo[this.module].filter,...this.state.customFilters}, {}, true);
          if (this.props.paginginfo[this.module].filters) {
            let filters = this.props.paginginfo[this.module].filters
            Object.keys(filters).map(k => { filters[k].auto = false });
            this.setState({ filters: filters });
          }
        } else {
          this.handleTableChange({ current: 1, pageSize: 10 }, this.state.customFilters, {}, true);
        }
      } else {
        if (response.message) {
          notifyUser(response.message, "error");
        } else {
          notifyUser("Unknown error. Please try again!", "error");
        }
        this.setState({ loading: false });
      }
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
    const statusFilter = () => {
      return (typeof this.props.patient_status_list !== "undefined" && this.props.patient_status_list.length > 0) ?
        <Select
          showSearch
          mode="multiple"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          style={{ width: '100%' }}
          placeholder="Filter by events"
          onChange={(v) => this.onCustomFilter("group_id", v)}
          maxTagCount="responsive"
          defaultValue={this.state.customFilters.group_id}
          value={this.state.customFilters.group_id}
        >
          {this.state.events_list.map(function (item) {
            return (
              <Option key={item.id.toString()} value={item.id.toString()}>
                {item.name}
              </Option>
            );
          })}
        </Select>
        :
        <Select style={{ width: '100%' }} placeholder="Filter by events"></Select>
    }
    return (
      <div className="gray-bg">
        <Row gutter={24}>
          <Col xs={8} sm={8} md={4} lg={4}>
            <Typography.Title level={4}>
              Pre-registration list
            </Typography.Title>            
          </Col>
          <Col xs={8} sm={8} md={8} lg={8}>
            {statusFilter()}
          </Col>
          <Col xs={8} sm={12}>
            <Button
							type="primary"
							className="right-fl def-blue"
							htmlType="button"
							onClick={() => this.props.history.goBack()}
              style={{ marginLeft: 5}}
						>
							<ArrowLeftOutlined />
							<IntlMessages id="admin.userlisting.back" />
						</Button>
            <Button
              type="primary"
              onClick={() => this.props.history.push("./add-group-patient")}
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
  return bindActionCreators({ ...adminActions, ...labsActions, ...patientActions, ...paginationActions, ...GroupConciergeActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    AllPatients
  )
);