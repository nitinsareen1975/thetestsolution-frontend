import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../../redux/actions/user-actions";
import * as paginationActions from "../../../redux/actions/pagination-actions";
import {
  Switch,
  Table,
  Icon,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Tooltip
} from "antd";
import { EditCell } from "../../shared/components/helperCells";
import * as UserService from "../../../services/user-service";
import { notifyUser } from "../../../services/notification-service";
import AppLocale from "../../../languageProvider";
class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.module = 'users';
    this.state = {
      dataLoaded: false,
      loading: false,
      data: [],
      pagination: {
        hideOnSinglePage: true,
        showTotal: (total, range) => {
          return (
            <span>
              <IntlMessages id="admin.text.showing" /> {range[0]}-{range[1]}{" "}
              <IntlMessages id="admin.text.of" /> {total}{" "}
              <IntlMessages id="admin.text.results" />
            </span>
          );
        },
        pageSize: 10,
        current: 1
      },
      filters: {}
    };
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  getSelectedFilterValue = (index) => {
    return this.props.paginginfo[this.module]&& this.props.paginginfo[this.module].filter && this.props.paginginfo[this.module].filter[index] || null;
  } 

  getHeaderKeys = () => {
    return [
      {
        title: <IntlMessages id="admin.userlisting.firstName" />,
        dataIndex: "firstName",
        filteredValue : this.getSelectedFilterValue('firstName'),
        ...this.getColumnSearchProps("firstName")
        //width: "200px"
        //sorter: true
      },
      {
        title: <IntlMessages id="admin.userlisting.lastName" />,
        dataIndex: "lastName",
        filteredValue : this.getSelectedFilterValue('lastName'),
        ...this.getColumnSearchProps("lastName")
        // width: "200px"
      },
      {
        title: <IntlMessages id="admin.userlisting.email" />,
        dataIndex: "userName",
        filteredValue : this.getSelectedFilterValue('userName'),
        ...this.getColumnSearchProps("userName")
        //width: "250px"
      },
      {
        title: <IntlMessages id="admin.userlisting.phone" />,
        dataIndex: "contactNo",
        // width: "250px",
        filteredValue : this.getSelectedFilterValue('contactNo'),
        ...this.getColumnSearchProps("contactNo")
      },
      {
        title: <IntlMessages id="admin.userlisting.role" />,
        dataIndex: "role"
        // width: "200px"
      },
      {
        title: <IntlMessages id="admin.userlisting.status" />,
        render: (_text, record) => (
          <span>
            <Switch
              checkedChildren={<IntlMessages id="admin.status.active" />}
              unCheckedChildren={<IntlMessages id="admin.status.inactive" />}
              checked={record.isActive}
              onClick={() =>
                this.updateUserStatus(!record.isActive, record.userId)
              }
            />
          </span>
        )
      },
      {
        title: <IntlMessages id="admin.userlisting.action" />,
        rowKey: "action",
        // width: "200px",
        render: (_text, record) => (
          <span>
            <EditCell
              onEditCell={() => {
                this.editItem(record.userId);
              }}
            />

            <button
              className="icon"
              onClick={() =>
                this.props.history.push("../user/audit-logs/" + record.userId)
              }
            >
              <Tooltip title={<IntlMessages id="admin.userlisting.viewlogs" />}>
                {/* <i className="fas fa-edit"></i> */}
                <i className="fas fa-clipboard-list"></i>
              </Tooltip>
            </button>
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
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            <IntlMessages id="admin.search" />
          </Button>
          <Button
            disabled={selectedKeys != "" && selectedKeys !== null ? false : true}
            onClick={() => this.handleReset(clearFilters, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            <IntlMessages id="admin.reset" />
          </Button>
        </div>
      );
    },
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
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
      auto:true
    };
    this.setState({ filters: filters });
    this.props.updateFilters({module:this.module, filters: filters})
    confirm();
  };

  handleReset = (clearFilters, dataIndex) => {
    clearFilters();
    let filters = this.state.filters;
    if (filters[dataIndex]) {
      if(filters[dataIndex].setSelectedKeys && typeof filters[dataIndex].setSelectedKeys === 'function'){
        filters[dataIndex].setSelectedKeys("");
        //filters[dataIndex].confirm();
      }
    }
    if(filters[dataIndex] && !filters[dataIndex].auto){
      delete this.props.paginginfo[this.module].filter[dataIndex];
      this.handleTableChange({ current: 1, pageSize: 10 }, this.props.paginginfo[this.module].filter, {});
   
    }
    filters[dataIndex] = { val: "", clearf: "", filter: false };
    this.setState({ filters: filters });
    this.props.updateFilters({module: this.module, filters:  filters})
    this.setState({ searchText: "" });
  };

  componentWillReceiveProps(newProp){
    //console.log('componentWillReceiveProps ', newProp);
  }

  async componentDidMount() {
    this.initComponent();
  }

  initComponent = async() => {
    if(this.props.paginginfo && this.props.currentModule !== "" && this.props.currentModule !== this.module){
      this.props.clearPaginationExceptMe(this.module);
    } else {
      if(this.props.paginginfo && this.props.paginginfo[this.module]){
        this.handleTableChange(this.props.paginginfo[this.module].pagination, this.props.paginginfo[this.module].filter, {},true);
        if(this.props.paginginfo[this.module].filters){
        let filters = this.props.paginginfo[this.module].filters
        Object.keys(filters).map(k=> {filters[k].auto = false});
          this.setState({filters :  filters});
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

  editItem = id => {
    this.props.history.push("" + id);
  };

  handleTableChange = (pagination, filters, sorter, manual) => {
    if(filters === undefined) filters={};
    Object.keys(filters).map( key => { if((!filters[key]) || (Array.isArray(filters[key]) && filters[key].length===0)) { delete filters[key] }} )
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    if(manual !== true)
    {
      this.props.updatePaginationRemoveOld({module:this.module, filter: filters,
      pagination: { current: pagination.current, pageSize: pagination.pageSize }})
    }
    this.setState({ loading: true });
    this.props
      .getUserListing({
        orgId: this.props.userData.companyID
          ? this.props.userData.companyID
          : UserService.getUser().companyID,
        filters: filters,
        pagination: { page: pagination.current, pageSize: pagination.pageSize },
        sorter: sorter
      })
      .then(resp => {
        pager.total = resp.paging.totalRecords;
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

  updateUserStatus = async (selected, userId) => {
    this.setState({loading: true});
    try {
      this.props.updateStatus(userId, selected).then(response => {
        const { language } = this.props;
        const currentAppLocale = AppLocale[language.locale];
        if (response.data && response.data.message) {
          notifyUser(response.data.message, "success");
          this.setState({loading: false});
          this.initComponent();
        } else {
          notifyUser(currentAppLocale.messages["admin.unknown.error"], "error");
          this.setState({loading: false});
        }
      });
    } catch (e) {
      console.log("Error:", e);
      this.setState({loading: false});
    }
  };

  render() {
    let _state = this.state;
    let _this = this;
    let filtertag = Object.keys(this.state.filters).map(function(key1) {
      let keyLabel = _this.getHeaderKeys().find(el => el.dataIndex === key1);
      if (keyLabel.title.props && keyLabel.title.props.id) {
        keyLabel = <IntlMessages id={keyLabel.title.props.id} />;
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
              <Icon type="close" />
            </Button>
            &nbsp;
          </span>
        );
      }
    });

    return (
      <div>
        <Row gutter={24}>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography.Title level={4}>
              <IntlMessages id="admin.userlisting.manageUsers" />
            </Typography.Title>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button
              type="primary"
              onClick={() => this.editItem("new")}
              className="right-fl def-blue"
            >
              <IntlMessages id="admin.userlisting.addnew" />
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
              bordered
              columns={this.getHeaderKeys()}
              rowKey={record => record.userId}
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

ManageUsers.propTypes = {
  location: PropTypes.object,
  userData: PropTypes.object,
  getUserListing: PropTypes.func
};
function mapStateToProps(state) {
    return {
      ...state.user,
      ...state.pagination,
      ...state.language
    };  
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...userActions, ...paginationActions }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
    ManageUsers
  )
);
