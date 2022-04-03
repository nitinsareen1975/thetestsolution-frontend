import React, { useState } from "react";
import { Result, Button, message, Spin } from "antd";
import Config from "../../config";
const output = ({ ...props }) => {
	const [submitting, setSubmitting] = useState(false);
	return <Spin spinning={submitting}>
		<Result
			status={"success"}
			title={"Thank you, your appointment is scheduled successfully!"}
			subTitle={<div style={{ maxWidth: 767, margin: '0 auto', fontSize: 18 }}>Please see the registration attendant for check-in. Once your testing is completed, you will receive your results at the email provided in the pre-registration within 2 to 3 hours. If results are not received within three hours, please call {Config.customerServiceNumber} and customer service will assist you.</div>}
			extra={[
				<Button onClick={() => window.location = Config.WEB_URL} type="primary" key="homebtn">
					Go to Homepage
				</Button>
			]}
		/>
	</Spin>
}
export default output;