import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { notifyUser } from "../../services/notification-service";
import GroupConciergeAPI from "../../redux/api/group-concierge-api";

const output = ({ ...props }) => {
	const reportRef = useRef();
	const [event, setEvent] = useState(false);
	
	useEffect(async () => {
		await GroupConciergeAPI.getPreRegistrationQRCodePDF({ eventId: props.match.params.eventId }).then(resp => {
			if (resp.status && resp.status === true) {
				setEvent(resp.data);
			} else {
				if (resp.message) {
					notifyUser(resp.message, "error");
				} else {
					notifyUser("Event not found.", "error");
				}
			}
			setSubmitted(false);
		}).catch((e) => {
			setSubmitted(false);
		});
	}, []);

	return <div className="">
		{event.url ?
			<>
				<style>{"\
					html{\
						overflow:hidden;\
					}\
				"}</style>
				<iframe src={event.url} style={{ height: '100vh', width: '100%', border: 'none' }}></iframe>
			</>
			: "Loading event data..."}
	</div >;
}
export default output;