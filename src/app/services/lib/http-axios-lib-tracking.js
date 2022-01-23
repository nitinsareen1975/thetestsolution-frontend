import axios from 'axios';
import Config from '../../../src/config';
import * as UserServices from "../user-service";

const instance = token => {
	let headers = {};
	if(token !== "NO_TOKEN"){
		token = UserServices.getToken();
		if (token) headers['authorization'] = token ? 'Bearer ' + token : undefined;
	}
	var item = axios.create({
		baseURL: Config.API3,
		headers: headers,
		transformResponse: [
			function(data) {
				return data;
			}
		],
		validateStatus: function(status) {
			if (status === 403) {
				//request login
				window.location.href = "/login";
			}
			return status >= 200 && status < 300; // default
		}
	});
	return item;
};

export default {
	request(options, token) {
		return instance(token).request(options);
	}
};
