import * as UserService from './user-service';
import Roles from './../user-roles';
const permissions = Roles.permissions;

export function canAccess(permission) {
	let status = false;
	if(permission === '') return status;
	let currentUser = UserService.getUser();
	if(currentUser.role === "") return status;
	if(permissions[permission].indexOf(currentUser.role) > -1){
		status = true;
	} else {
		status = false;
	}
	return status;
}

export function isTopLevelManager() {
	let status = false;
	let currentUser = UserService.getUser();
	if(currentUser.companyID === currentUser.parentOrgId){
		status = true;
	} else {
		status = false;
	}
	return status;
}

export function isRole(role) {
	let status = false;
	if(role === '') return status;
	let currentUser = UserService.getUser();
	if(currentUser.role === "") return status;
	if(Array.isArray(role)){
		status = false;
		role.map(function(item){
			if(item == currentUser.role){
				status = true;
			}
		});
	} else {
		if(currentUser.role === "") return status;
		if(role == currentUser.role){
			status = true;
		} else {
			status = false;
		}
	}
	return status;
}