import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Input, Row, Button, Spin, Radio, Alert, message } from "antd";
import IntlMessages from "../../../services/intlMesseges";
import LabAPI from "../../../redux/api/lab-api";
import * as UserService from "../../../services/user-service";
import { loadStripe } from '@stripe/stripe-js';
import Config from "../../../config";
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
			filters: {},
			pagination: {},
			sorter: { column: "name", order: "asc" }
		}
		await LabAPI.getGlobalLabPricing(/* parentprops.data.lab_assigned */3, args).then(resp => {
			if (resp.status && resp.status === true) {
				setPricing(resp.data);
			}
		});
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

		const handleOk = async() => {
			props.setFormSubmitting(true);
			await stripe.createPaymentMethod({
				type: 'card',
				card: elements.getElement(CardElement),
				billing_details: {
					name: parentprops.data.firstname + " " + parentprops.data.lastname,
					phone: parentprops.data.phone,
					email: parentprops.data.email
				}
			}).then(response => {
				if (typeof response.error !== "undefined") {
					message.error(response.error.message);
				}
				if (typeof response.paymentMethod !== "undefined" && response.paymentMethod.id) {
					var formData = {
						pricing_id: pricingId,
						transaction_id: response.paymentMethod.id
					};
					parentprops.handleSubmit(formData)
				}
				props.setFormSubmitting(false);
			}).catch(error => {
				props.setFormSubmitting(false);
			});
		};

		return (
			<>
				<Row gutter={15}>
					<Col xs={24} sm={12}>
						<Form.Item style={{ background: '#fff', padding: 10, border: '1px solid #ccc', borderRadius: 4 }}>
							<CardElement />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={15}>
					<div className="steps-action">
						<Button onClick={props.parentPrev}>
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
		console.log("submittig: ", val)
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

	return <div id="paymentForm">
		<Spin spinning={false}>
			<Form ref={formRef} layout="vertical" initialValues={props.data}>
				<h2 className="form-section-title">Payment details</h2>
				<Row gutter={15}>
					<Col xs={24}>
						{pricing.length > 0 ?
							<Form.Item name="pricing_id" label="Select Type of Test" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
								<Radio.Group className="radio-test-price-wrapper" onChange={() => setPricingState()}>
									{pricing.map(price => {
										var hms = price.estimated_hours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + price.estimated_minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + price.estimated_seconds.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
										var hmsArr = hms.split(':');
										var seconds = (+hmsArr[0]) * 60 * 60 + (+hmsArr[1]) * 60 + (+hmsArr[2]);
										var duration = UserService.secondsToHms(seconds);
										return <Radio.Button key={price.id} value={price.id}>
											<div className="radio-test-price">
												<div className="pricing-title">{price.test_name}</div>
												<div className="pricing-amount">
													<span className="pricing-amount-currency">$</span>
													{price.price}
												</div>
												<div className="pricing-results">Results in {duration}</div>
											</div>
										</Radio.Button>
									})}
								</Radio.Group>
							</Form.Item>
							: <Alert message="Pricing not setup for this lab, please try to choose different location." type="error" />}
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