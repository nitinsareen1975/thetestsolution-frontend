import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Input, Row, Button, Spin, Radio, Alert, message, Typography } from "antd";
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
const output = ({ ...props }) => {
	const [refunded, setRefunded] = useState(false);
	var parentprops = props;
	var pricing = parentprops.pricingArray;
	var pricingId = parentprops.pricingId;

	useEffect(async () => {
		if (parentprops.data.transaction_id) {
			await PatientAPI.getTransactionDetails({ transaction_id: parentprops.data.transaction_id }).then(resp => {
				if (resp.status && resp.status === true) {
					if (resp.data.payment_status == "refunded") {
						setRefunded(true);
					}
				}
			})
		}
	}, [parentprops.pricingId]);

	const refund = async (transactionId) => {
		if (confirm("Are you sure?")) {
			parentprops.setLoading(true);
			await PatientAPI.refundTransaction({ transaction_id: transactionId }).then(resp => {
				if (resp.status && resp.status === true) {
					message.success("Transaction refunded successfully.");
					setRefunded(true);
				}
				parentprops.setLoading(false);
			}).catch(() =>{
				parentprops.setLoading(false);
			});
		}
	}

	const CheckoutForm = ({ ...props }) => {
		const stripe = useStripe();
		const elements = useElements();

		const handleSubmit = async (event) => {
			event.preventDefault();
			if (pricingId <= 0) {
				message.error("Please choose a pricing.");
				return false;
			}
			if (elements == null) {
				return false;
			}
			if (confirm("Are you sure all the data entered is correct? Do you want to proceed?")) {
				handleOk();
			}
		};

		const handleOk = async () => {
			parentprops.setLoading(true);

			var formData = {
				pricing_id: pricingId,
				customer_name: parentprops.data.firstname + " " + parentprops.data.lastname,
				customer_phone: parentprops.data.phone,
				customer_email: parentprops.data.email
			}
			var response = await Axios.post(Config.API + "/global/create-payment-intent", formData, undefined);
			const payload = await stripe.confirmCardPayment(response.data, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			});
			if (payload.error) {
				message.error(`Payment failed ${payload.error.message}`);
				parentprops.setLoading(false);
			} else {
				var formData = {
					pricing_id: pricingId,
					transaction_id: payload.paymentIntent.id,
					...parentprops.data
				};
				parentprops.setTransactionId(payload.paymentIntent.id);
				parentprops.onSubmit(formData);
				parentprops.setLoading(false);
			}
		};

		return (
			<>
				<Row gutter={15}>
					<Col xs={24} sm={12}>
						<Form.Item style={{ background: '#fff', padding: 10, border: '1px solid #ccc', borderRadius: 4 }}>
							<CardElement hidePostalCode={true} />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={15}>
					<div className="steps-action">
						<Button
							type="primary"
							style={{ display: "inline-block", marginLeft: "8px" }}
							className="def-blue"
							htmlType="submit"
							size="large"
							onClick={(e) => handleSubmit(e)}
						>
							<IntlMessages id="admin.userlisting.add" />
							<PlusCircleOutlined />
						</Button>
					</div>
				</Row>
			</>
		);
	};

	const setSubmitting = (val) => {
		var loaderDiv = '<div id="paymentLoader"><div class="ant-spin ant-spin-spinning"><span class="ant-spin-dot ant-spin-dot-spin"><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i></span></div></div>';
		var div = document.createElement('div');
		div.innerHTML = loaderDiv.trim();
		loaderDiv = div.firstChild;
		if (val === false) {
			document.getElementById("paymentLoader").remove();
			document.getElementById("paymentForm").getElementsByClassName("ant-spin-container")[0].classList.remove("ant-spin-blur");
		} else {
			document.getElementById("paymentForm").getElementsByClassName("ant-spin-container")[0].classList.add("ant-spin-blur");
			var eElement = document.getElementById("paymentForm").getElementsByClassName("ant-spin-nested-loading")[0];
			eElement.insertBefore(loaderDiv, eElement.firstChild);
		}
	}

	const stripePromise = loadStripe(Config.StripeAPIKey);
	return <div>
		<Row gutter={24}>
			<Col xs={24} sm={24}>
				<Typography.Title level={5}>Payment</Typography.Title>
			</Col>
		</Row>
		<hr />
		{parentprops.paymentDone === true ?
			(
				<Row gutter={15}>
					<Col xs={24} md={6}>
						<Form.Item name="payment_provider" label="Payment Provider Name" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
							<Input placeholder="For example: Stripe, Paypal etc." disabled />
						</Form.Item>
					</Col>
					<Col xs={24} md={6}>
						<Form.Item name="transaction_id" label="Transaction ID" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
							<Input placeholder="Transaction ID generated after payment" disabled />
						</Form.Item>
					</Col>
					{refunded === true ?
						<Col xs={24} md={12}>
							<Form.Item label="Status"><Typography.Title level={5}>Refunded</Typography.Title></Form.Item>
						</Col>
						: ""
						/* <Col xs={24} md={12}>
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
						</Col> */
					}
				</Row>
			)
			:
			(<div id="paymentForm">
				<Spin spinning={false}>
					{pricing.length > 0 && pricingId > 0 ?
						<Elements stripe={stripePromise}>
							<CheckoutForm setFormSubmitting={(value) => setSubmitting(value)} />
						</Elements>
						: ""
					}
				</Spin>
			</div>)}
	</div>
}
export default output;