import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Input, Row, Button, Spin, Radio, Alert, message, Typography, Select } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
import { PlusCircleOutlined, UndoOutlined } from '@ant-design/icons';
import { loadStripe } from '@stripe/stripe-js';
import Config from "../../../../config";
import Axios from "../../../../services/axios-service";
import {
	CardElement,
	Elements,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import PatientAPI from "../../../../redux/api/patient-api";
import PricingAPI from "../../../../redux/api/pricing-api";
const { Option } = Select;
const output = ({ ...props }) => {
	const [refunded, setRefunded] = useState(false);
	const [paymentMethods, setPaymentMethods] = useState(false);
	const [pricing, setPricing] = useState(false);
	const [pricingId, setPricingId] = useState(0);
	var parentprops = props;

	useEffect(async () => {
		if (parentprops.data.transaction_id) {
			setPricingId(parentprops.pricingId);
			await PatientAPI.getTransactionDetails({ transaction_id: parentprops.data.transaction_id }).then(resp => {
				if (resp.status && resp.status === true) {
					if (resp.data.payment_status == "refunded") {
						setRefunded(true);
					}
				}
			});
			var walkin = false;
			await PatientAPI.isWalkinPatient(parentprops.data.id).then(resp => {
				if (resp.status && resp.status === true) {
					if (resp.data.is_walkin_patient === true) {
						walkin = true;
					}
				}
			});
			var args = {
				filters: {},
				pagination: {},
				sorter: { column: "name", order: "asc" }
			}
			if(walkin === true){
				args.filters = {is_walkin_price: 1};
			} else {
				args.filters = {is_walkin_price: 0};
			}
			await PricingAPI.getGlobalPricing(args).then(resp => {
				if (resp.status && resp.status === true) {
					setPricing(resp.data);
				}
			});
		} else {
			await PatientAPI.getPaymentMethods({}).then(resp => {
				if (resp.status && resp.status === true) {
					setPaymentMethods(resp.data);
				}
			});
			var args = {
				filters: { is_walkin_price: 1 },
				pagination: {},
				sorter: { column: "name", order: "asc" }
			}
			await PricingAPI.getGlobalPricing(args).then(resp => {
				if (resp.status && resp.status === true) {
					setPricing(resp.data);
				}
			});
		}
	}, [pricingId]);

	const refund = async (transactionId) => {
		if (confirm("Are you sure?")) {
			parentprops.setLoading(true);
			await PatientAPI.refundTransaction({ transaction_id: transactionId }).then(resp => {
				if (resp.status && resp.status === true) {
					message.success("Transaction refunded successfully.");
					setRefunded(true);
				}
				parentprops.setLoading(false);
			}).catch(() => {
				parentprops.setLoading(false);
			});
		}
	}

	const setPricingState = (e) => {
		setPricingId(e.target.value);
	};
	return <div>
		<Row gutter={24}>
			<Col xs={24} sm={24}>
				<Typography.Title level={5}>Pricing</Typography.Title>
			</Col>
		</Row>
		<hr />
		{parentprops.paymentDone === true ?
			(
				<>
					<Row gutter={15}>
						<Col xs={24}>
							{pricing.length > 0 ?
								<Form.Item name="pricing_id" label="Select Pricing" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
									<Radio.Group disabled className="radio-test-price-wrapper" value={pricingId} onChange={(e) => setPricingState(e)}>
										{pricing.map(price => {
											if (parseFloat(price.retail_price) > 0) {
												return <Radio.Button key={price.id} value={price.id}>
													<div className="radio-test-price">
														<div className="pricing-title">{price.name}</div>
														<div className="pricing-amount">
															<span className="pricing-amount-currency">$</span>
															{price.retail_price}
														</div>
														<div className="pricing-results">Results in {price.test_duration}</div>
													</div>
												</Radio.Button>
											} else {
												return <Radio.Button key={price.id} value={price.id}>
													<div className="radio-test-price">
														<div className="pricing-title" style={{ height: 15 }}>&nbsp;</div>
														<div className="pricing-amount" style={{ fontSize: 24 }}>
															{price.name}
														</div>
														<div className="pricing-results">Results in {price.test_duration}</div>
													</div>
												</Radio.Button>
											}
										})}
									</Radio.Group>
								</Form.Item>
								: <Alert message="Pricing not setup, please contact support." type="error" />}
						</Col>
					</Row>
					{/* <Row gutter={15}>
						<Col xs={24} md={6}>
							<Form.Item name="payment_provider" label="Payment Provider Name" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
								<Input placeholder="For example: Stripe, Paypal etc." disabled />
							</Form.Item>
						</Col>
						<Col xs={24} md={6}>
							<Form.Item name="transaction_id" label="Transaction ID / Reference" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
								<Input placeholder="Transaction ID generated after payment" disabled />
							</Form.Item>
						</Col>
						{refunded === true ?
							<Col xs={24} md={12}>
								<Form.Item label="Status"><Typography.Title level={5}>Refunded</Typography.Title></Form.Item>
							</Col>
							:
							<Col xs={24} md={12}>
								<Form.Item label="Actions">
									<Button
										type="primary"
										className="def-blue"
										htmlType="button"
										onClick={() => refund(props.data.transaction_id)}
									>
										<UndoOutlined />
										Refund Transaction
									</Button>
								</Form.Item>
							</Col>
						}
					</Row> */}
				</>
			)
			:
			(<div id="paymentForm">
				<Spin spinning={false}>
					{pricing.length > 0 ?
						<>
							<Row gutter={15}>
								<Col xs={24}>
									{pricing.length > 0 ?
										<Form.Item name="pricing_id" label="Select Pricing" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
											<Radio.Group className="radio-test-price-wrapper" onChange={(e) => setPricingState(e)}>
												{pricing.map(price => {
													if (parseFloat(price.retail_price) > 0) {
														return <Radio.Button key={price.id} value={price.id}>
															<div className="radio-test-price">
																<div className="pricing-title">{price.name}</div>
																<div className="pricing-amount">
																	<span className="pricing-amount-currency">$</span>
																	{price.retail_price}
																</div>
																<div className="pricing-results">Results in {price.test_duration}</div>
															</div>
														</Radio.Button>
													} else {
														return <Radio.Button key={price.id} value={price.id}>
															<div className="radio-test-price">
																<div className="pricing-title" style={{ height: 15 }}>&nbsp;</div>
																<div className="pricing-amount" style={{ fontSize: 24 }}>
																	{price.name}
																</div>
																<div className="pricing-results">Results in {price.test_duration}</div>
															</div>
														</Radio.Button>
													}
												})}
											</Radio.Group>
										</Form.Item>
										: <Alert message="Pricing not setup, please contact support." type="error" />}
								</Col>
							</Row>
							{/* <Row gutter={15}>
								<Col xs={24} md={6}>
									<Form.Item name="payment_provider" label="Payment Provider Name" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
										<Select
											style={{ width: "100%" }}
										>
											{paymentMethods.map(function (item) {
												return (
													<Option key={item.name.toString()} value={item.name.toString()}>
														{item.name}
													</Option>
												);
											})}
										</Select>
									</Form.Item>
								</Col>
								<Col xs={24} md={6}>
									<Form.Item name="transaction_id" label="Transaction ID / Reference" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
										<Input placeholder="Transaction ID generated after payment" />
									</Form.Item>
								</Col>
							</Row> */}
						</>
						: ""
					}
				</Spin>
			</div>)}
	</div>
}
export default output;