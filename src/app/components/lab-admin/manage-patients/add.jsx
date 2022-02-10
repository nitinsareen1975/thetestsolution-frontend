import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as adminActions from "../../../redux/actions/admin-actions";
import * as userActions from "../../../redux/actions/user-actions";
import * as RolesActions from "../../../redux/actions/roles-actions";
import { notifyUser } from "../../../services/notification-service";
import {Form, Select, Button, Row, Col, Spin} from "antd";
import IntlMessages from "../../../services/intlMesseges";
import { PlusCircleOutlined} from '@ant-design/icons';
import ContactInfo from "../manage-patients/manage-patients-information/contact-info.jsx";
import HomeAddressInfo from "../manage-patients/manage-patients-information/home-address.jsx";
import PersonalInfo from "../manage-patients/manage-patients-information/personal-info.jsx";
import SymptomsInfo from "../manage-patients/manage-patients-information/symptoms-info.jsx";
import Identification from "../manage-patients/manage-patients-information/identification.jsx";
import TestType from "../manage-patients/manage-patients-information/test.jsx";
const { Option } = Select;

class AddUser extends React.Component {
	state = {
		loading: true,
		firstname: "",
		lastname: "",
		email: "",
		phone: "",
		street: "",
		city: "",
		state: "",
		country: "",
		zip: "",
		status: "",
		can_read_reports: "",
		countries: [],
		allRoles: [],
		dataLoaded: false
	};

	async componentDidMount() {
		var _countries = [];
		if(typeof this.props.countries === "undefined" || this.props.countries.length <= 0 ){
			_countries = await this.props.getCountries();
		} else {
			_countries = this.props.countries;
		}
		var args = {
			filters: {},
			pagination: {},
			sorter: {column: "name", order: "asc"}
		}
		var roles = await this.props.getAllRoles(args);
		this.setState({ 
			loading: false,
			countries: _countries,
			allRoles: roles, 
			dataLoaded: true 
		});
	}

	handleSubmit = (data) => {
		this.setState({ loading: true });
		data.status = data.status === true ? "1" : "0";
		this.props.addUser(data).then(response => {
			if (response.status && response.status == true) {
				notifyUser(response.message, "success");
				//notifyUser("User added successfully!", "success");
				this.props.history.push("../users");
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
		.catch(err => {
			var res = JSON.parse(err.response.data);
			if (res.message) {
				notifyUser(res.message, "error");
			} else {
				notifyUser("Unknown error. Please try again!", "error");
			}
			this.setState({ loading: false });
		});
	};

	render() {
		const { formLayout } = this.state;
		const formItemLayout =
			formLayout === "horizontal"
				? {
					labelCol: { span: 4 },
					wrapperCol: { span: 14 }
				}
				: null;
		const countriesSelector = <Select
				showSearch
				filterOption={(input, option) =>
				option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
			>
				{this.state.countries.map(function(item) {
				return (
					<Option key={item.id} value={item.id}>
					{item.name}
					</Option>
				);
				})}
			</Select>;
		return (
			<div>
				<Spin spinning={this.state.loading}>
					<Form layout="vertical" onFinish={this.handleSubmit}>
						<ContactInfo />
						<PersonalInfo />
						<HomeAddressInfo />
						<SymptomsInfo />
						<Identification />
						<TestType />
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
										<PlusCircleOutlined />
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Spin>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { ...state.userConfig, ...state.countries, ...state.adminConfig };
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ ...userActions, ...RolesActions, ...adminActions }, dispatch);
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
		AddUser
	)
);
