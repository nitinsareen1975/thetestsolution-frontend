import Axios from "../../services/axios-service";
import AxiosAuth from "../../services/axios-service-auth";

const login = data => {
  return AxiosAuth.post("/login", data, undefined);
};

const getUserData = (data) => {
	return Axios.get("/validateToken", data, undefined);
};

const getUserListing = data => {
  return Axios.get("/users?filters="+encodeURIComponent(JSON.stringify(data)), data, undefined);
};

const updateUser = data => {
  return Axios.put("/api/Users/"+data.userId, data, undefined);
};

const addUser = data => {
  return Axios.post("/api/Users", data, undefined);
};

const getUser = idx => {
  return Axios.get("/api/Users/"+idx, undefined, undefined);
};

const deleteUser = data => {
  return Axios.delete("/users/"+ data.userId, data, undefined);
};

const forgotPassword = data => {
  return AxiosAuth.post("/forgot-password", data, undefined);
};

const resetPassword = data => {
  return AxiosAuth.post("/reset-password", data, undefined);
};

const getAllUserRoles = data => {
  return Axios.get("/api/Roles/InternalRoles?filters="+encodeURIComponent(JSON.stringify(data)), data, undefined);
};

const updateToken = data => {
  return AxiosAuth.post("/refresh-token", data, undefined);
};

const updateProfile = data => {
  return Axios.put("/api/Users/"+data.userId, data, undefined);
};
const getMyAccount = async () => {
  return await Axios.get("/api/Users/Profile", undefined, undefined);
};
const updateMyAccount = async (data) => {
  return await Axios.put("/api/Users/Profile", data, undefined);
};
const updatePassword = async (data) => {
  return await Axios.post("/api/Users/updatePassword", data, undefined);
};
const updateStatus = (userId, status) => {
  return Axios.put("/api/UserStatus/"+userId+"/"+status, undefined, undefined);
};
const updateContactDetails = (data) => {
  return Axios.post("/api/UserContactDetails/", data, undefined);
};
const assignIdentity = data => {
  return Axios.post("/api/Users/AssignIdentity",data, undefined,undefined);
};
const getActiveInternalUsers = data => {
  let _orgId = data.orgId;
  delete data.orgId;
  return Axios.get("/api/OrganizationActiveUsers/" + _orgId + "?search="+encodeURIComponent(JSON.stringify(data)), undefined, undefined);
};
const hasB2B2CEmergencyContact = (userId) => {
  return Axios.get("/api/B2B2CEmergencyContactExists/"+userId, undefined, undefined);
};
const updateB2B2CEmergencyContact = (userId, data) => {
  return Axios.put("/api/UpdateB2B2CEmergencyContact/"+userId, data, undefined);
};
export default {
  login,
  getUserData,
  getUserListing,
  updateUser,
  addUser,
  getUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  getAllUserRoles,
  updateToken,
  updateProfile,
  getMyAccount,
  updateMyAccount,
  updatePassword,
  updateStatus,
  updateContactDetails,
  assignIdentity,
  getActiveInternalUsers,
  hasB2B2CEmergencyContact,
  updateB2B2CEmergencyContact
};
