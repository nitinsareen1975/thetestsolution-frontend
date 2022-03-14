import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Input, Row, Button, Spin, Radio, Alert, message, ConfigProvider } from "antd";
import IntlMessages from "../../../services/intlMesseges";
import PricingAPI from "../../../redux/api/pricing-api";
import * as UserService from "../../../services/user-service";
import { loadStripe } from '@stripe/stripe-js';
import Config from "../../../config";
import Axios from "../../../services/axios-service";
import {
	CardElement,
	Elements,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
const output = ({ ...props }) => {
	var parentprops = props;
	const [pricing, setPricing] = useState([]);
	const [pricingId, setPricingId] = useState(0);
	const formRef = useRef();

	useEffect(async () => {
		var args = {
			filters: {is_walkin_price:0},
			pagination: {},
			sorter: { column: "name", order: "asc" }
		}
		await PricingAPI.getGlobalPricing(args).then(resp => {
			if (resp.status && resp.status === true) {
				setPricing(resp.data);
			}
		});

		var url_string = window.location.href;
		var url = new URL(url_string);
		var urlpricing = url.searchParams.get("pricing");
		if(urlpricing != null && urlpricing != ""){
			formRef.current.setFieldsValue({'pricing_id': urlpricing });
			setPricingId(urlpricing);
		}
	}, []);

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
			props.setFormSubmitting(true);

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
				props.setFormSubmitting(false);
			} else {
				var formData = {
					pricing_id: pricingId,
					transaction_id: payload.paymentIntent.id
				};
				parentprops.handleSubmit(formData);
				props.setFormSubmitting(false);
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
						<Button onClick={parentprops.parentPrev}>
							Previous
						</Button>
						<Button style={{ margin: '0 8px' }} type="primary" onClick={(e) => handleSubmit(e)}>
							Submit
						</Button>
					</div>
				</Row>
			</>
		);
	};

	const setPricingState = () => {
		var pid = formRef.current.getFieldValue('pricing_id');
		setPricingId(pid);
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

	const stripePromise = loadStripe(Config.StripeAPIKey, { stripeAccount: Config.StripeAccountId });

	return <div id="paymentForm">
		<Spin spinning={false}>
			<Form ref={formRef} layout="vertical" initialValues={props.data}>
				<h2 className="form-section-title">Payment details</h2>
				<Row gutter={15}>
					<Col xs={24}>
						{pricing.length > 0 ?
							<Form.Item name="pricing_id" label="Select Pricing" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
								<Radio.Group className="radio-test-price-wrapper" value={pricingId} onChange={() => setPricingState()}>
									{pricing.map(price => {
										return <Radio.Button key={price.id.toString()} value={price.id.toString()}>
											<div className="radio-test-price">
												<div className="pricing-title">{price.name}</div>
												<div className="pricing-amount">
													<span className="pricing-amount-currency">$</span>
													{price.retail_price}
												</div>
												<div className="pricing-results">Results in {price.test_duration}</div>
											</div>
										</Radio.Button>
									})}
								</Radio.Group>
							</Form.Item>
							: <Alert message="Pricing not setup, please contact support." type="error" />}
					</Col>
				</Row>
				{pricing.length > 0 ?
					<Elements stripe={stripePromise}>
						<CheckoutForm setFormSubmitting={(value) => setSubmitting(value)} />
					</Elements>
					:
					<>
						<Row style={{ marginTop: '10px' }} gutter={15}>
							<Col xs={24}>
								<Button onClick={props.parentPrev}>
									Previous
								</Button>
							</Col>
						</Row>
					</>
				}
			</Form>
		</Spin>
	</div>
}
export default output;