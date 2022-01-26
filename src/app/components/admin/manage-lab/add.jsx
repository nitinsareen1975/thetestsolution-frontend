import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../../redux/actions/user-actions";
import * as RolesActions from "../../../redux/actions/roles-actions";
import { notifyUser } from "../../../services/notification-service";
import { Typography, Form, Input, Select, Button, Row, Col, Spin } from "antd";
import IntlMessages from "../../../services/intlMesseges";
import { PlusCircleOutlined, ArrowLeftOutlined} from '@ant-design/icons';
const { Option } = Select;

class AddLab extends React.Component {
	state = {
		loading: true,
		confirmDirty: false,
		userId: 0,
		identityId: "",
		firstName: "",
		lastName: "",
		userName: "",
		contactNo: "",
		address: "",
		state: "",
		countryId: "",
		roleId: "",
		created: "",
		countries: [],
		allRoles: [],
		dataLoaded: false
	};

	async componentDidMount() {
		this.setState({ loading: false });
		this.setState({ dataLoaded: true });
	}

	submitForm = data => {
		this.props
			.updateUser(data)
			.then(response => {
				if (response.error) {
					if (response.error.message) {
						notifyUser(response.error.message, "error");
					} else {
						notifyUser("Unknown error. Please try again!", "error");
					}
					this.setState({ loading: false });
				} else {
					notifyUser("User added successfully", "success");
					//notifyUser("User added successfully!", "success");
					this.props.history.push("./");
					this.setState({ loading: false });
				}
			})
			.catch(err => {
				this.setState({ loading: false });
			});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.setState({ loading: true });
				this.submitForm(values);
			}
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
		return (
			<div>
				<Row gutter={24}>
					<Col xs={24} sm={24} md={12} lg={12} xl={12}>
						<Typography.Title level={4}>
							Add Lab
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
							onClick={() => this.props.history.push("../")}
						>
							<ArrowLeftOutlined />
							<IntlMessages id="admin.userlisting.back" />
						</Button>
					</Col>
				</Row>
				<hr />
				<div>
					<Spin spinning={this.state.loading}>
						<Form layout="vertical" onSubmit={this.handleSubmit}>
							<Row gutter={24}>
								<Col xs={24} sm={24} md={8} lg={8} xl={8}>
									<Form.Item
										{...formItemLayout}
										name="firstname"
										label={<IntlMessages id="admin.userlisting.firstName" />}
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
										<Input size="large" maxLength={20} />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={8} lg={8} xl={8}>
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
										initialValue={this.state.lastName === null ? "" : this.state.lastName}
										>
											<Input size="large" maxLength={20} />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={8} lg={8} xl={8}>
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
										initialValue={this.state.userName === null ? "" : this.state.userName}
										>
											{this.state.userId === 0 ? <Input size="large" maxLength={80} /> : <Input disabled />}
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col xs={24} sm={24} md={8} lg={8} xl={8}>
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
										initialValue={this.state.contactNo === null ? "" : this.state.contactNo}
									>
										<Input size="large" maxLength={15} style={{ width: "100%" }} />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={8} lg={8} xl={8}>
									<Form.Item
										{...formItemLayout}
										label={<IntlMessages id="admin.userlisting.address" />}
										name="address"
										initialValue={this.state.address === null ? "" : this.state.address}
									>
										<Input size="large" />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={8} lg={8} xl={8}>
									<Form.Item
										{...formItemLayout}
										label={<IntlMessages id="admin.userlisting.role" />}
									>
										<Select size="large">
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
										{/* <Button
                      type="default"
                      className=""
                      htmlType="button"
                      onClick={() => this.props.history.push("./")}
                    >
                      <IntlMessages id="admin.userlisting.back" />
                    </Button>
                    &nbsp;&nbsp; */}
										<Button
											type="primary"
											style={{ display: "inline-block", marginRight: "10px" }}
											className="def-blue"
											htmlType="submit"
											size="large"
										>
											{this.state.userId > 0 ? (
												<IntlMessages id="admin.userlisting.update" />
											) : (
												<IntlMessages id="admin.userlisting.add" />
											)}
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
	return { ...state.user };
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ ...userActions, ...RolesActions }, dispatch);
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
		AddLab
	)
);
