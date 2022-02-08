import React from "react";
import { Result, Button } from "antd";
import Config from "../../../config";
const output = ({...props}) => {
	return <div>
		<Result
			status="success"
			title="Thank you, your appointment is booked successfully!"
			subTitle="Please check your email inbox for the confirmation email."
			extra={[
				<Button onClick={() => window.location = Config.WEB_URL} type="primary" key="homebtn">
					Go to Homepage
				</Button>
			]}
		/>
	</div>
}
export default output;