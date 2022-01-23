import { setCookie, removeCookie, getCookie } from '../services/cookies';

export function isLoggedIn() {
	let token = getToken();
	return token && token !== 'undefined';
}

export function logOut() {
	if (typeof window === 'undefined')
		localStorage.removeItem('user');
	removeCookie('token');
}

export function logIn(user, token, expiration) {
	//setUserData(user);
	removeCookie('token');
	setCookie('token', token, expiration);
}

export function getUser() {
	if (typeof window === 'undefined') return undefined;
	let user = localStorage.user;
	if (user) {
		return JSON.parse(user);
	}
	return undefined;
}

export function setUserData(user) {
	if (typeof window === 'undefined') return;
	localStorage.user = JSON.stringify({ ...user });
}

export function getToken_old() {
	let token = getCookie('token');
	if (token) {
		return token;
	}
	return undefined;
}

export function getToken() {
	let token = JSON.parse(localStorage.getItem('tokenData'));
	if (token) {
		return token.token;
	}
	return undefined;
}
