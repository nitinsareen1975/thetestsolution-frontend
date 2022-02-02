import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as adminActions from "../../../redux/actions/admin-actions";
import * as userActions from "../../../redux/actions/user-actions";
import * as RolesActions from "../../../redux/actions/roles-actions";
import { notifyUser } from "../../../services/notification-service";
import { Typography, Form, Input, Select, Button, Row, Col, Spin, Switch, Radio } from "antd";
import IntlMessages from "../../../services/intlMesseges";
import { PlusCircleOutlined, ArrowLeftOutlined} from '@ant-design/icons';
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
				<Row gutter={24}>
					<Col xs={24} sm={24} md={12} lg={12} xl={12}>
						<Typography.Title level={4}>
							Add User
						</Typography.Title>
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
										name="firstname"
										label={<IntlMessages id="admin.userlisting.firstName"  />  }

										rules={[
											{
												whitespace: true,
												required: true,
												message: <IntlMessages id="admin.input.required" />
											},
											{
												pattern: new RegExp(/^(\S.*)[a-zA-Z-.']+$/),
												message: <IntlMessages id="admin.name.valid"></IntlMessages>
											}
										]}
										initialValue={
											this.state.firstName === null
												? ""
												: this.state.firstName
										}
									>
										<Input maxLength={20} />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={6} lg={6} xl={6}>
									<Form.Item
										{...formItemLayout}
										label={<IntlMessages id="admin.userlisting.lastName" />}
										name="lastname"
										rules={[
												{
													whitespace: true,
													required: true,
													message: <IntlMessages id="admin.input.required" />
												},
												{
													pattern: new RegExp(/^(\S.*)[a-zA-Z-.']+$/),
													message: <IntlMessages id="admin.lname.valid"></IntlMessages>
												}
											]}
										initialValue={this.state.lastname === null ? "" : this.state.lastname}
										>
											<Input maxLength={20} />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={6} lg={6} xl={6}>
									<Form.Item
										{...formItemLayout}
										label={<IntlMessages id="admin.userlisting.email" />}
										name="email"
										rules={[
												{
													type: "email",
													message: <IntlMessages id="admin.email.valid" />

												},
												{
													whitespace: true,
													required: true,
													message: <IntlMessages id="admin.input.required" />
												}
											]}
										initialValue={this.state.email === null ? "" : this.state.email}
										>
											<Input maxLength={80} />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={6} lg={6} xl={6}>
									<Form.Item
										{...formItemLayout}
										label={<IntlMessages id="admin.userlisting.phonenumber" />}
										name="phone"
										rules={[
												{
													whitespace: true,
													required: true,
													message: <IntlMessages id="admin.input.required" />
												}
											]}
										initialValue={this.state.phone === null ? "" : this.state.phone}
									>
										<Input maxLength={15} style={{ width: "100%" }} />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								
								<Col xs={24} sm={24} md={6} lg={6} xl={6}>
									<Form.Item
										{...formItemLayout}
										label={<IntlMessages id="admin.userlisting.address" />}
										name="street"
										initialValue={this.state.street === null ? "" : this.state.street}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={6} lg={6} xl={6}>
									<Form.Item
										{...formItemLayout}
										label="City"
										name="city"
										initialValue={this.state.city === null ? "" : this.state.city}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={6} lg={6} xl={6}>
									<Form.Item
										{...formItemLayout}
										label="State"
										name="state"
										initialValue={this.state.state === null ? "" : this.state.state}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={6} lg={6} xl={6}>
									<Form.Item
										{...formItemLayout}
										label="Country"
										name="country"
										initialValue={this.state.country === null ? "" : this.state.country}
									>
										{countriesSelector}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col xs={24} sm={24} md={6} lg={6} xl={6}>
									 <Form.Item
										{...formItemLayout}
										label="Zip Code"
										name="zip"
										initialValue={this.state.zip === null ? "" : this.state.zip}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={6} lg={6} xl={6}>
									 <Form.Item name="status" label="Status" initialValue={this.state.status === null ? "" : this.state.status}>
										<Switch checkedChildren="Active" unCheckedChildren="Inactive"/>
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={6} lg={6} xl={6}>
									<Form.Item name="can_read_reports" label="Can Read Test Report?" initialValue={this.state.can_read_reports === null ? "" : this.state.can_read_reports}>
										<Radio.Group>
										<Radio value="1">Yes</Radio>
										<Radio value="0">No</Radio>
										</Radio.Group>
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={6} lg={6} xl={6}>
									<Form.Item
										{...formItemLayout}
										label={<IntlMessages id="admin.userlisting.role" />}
										name="roles"
									>
										<Select>
											{this.state.allRoles.map(function (item) {
												return <Option key={item.id}>{item.name}</Option>;
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
											<IntlMessages id="admin.userlisting.add" />
											<PlusCircleOutlined />
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
