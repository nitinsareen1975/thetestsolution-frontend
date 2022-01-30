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
  return Axios.put("/users/"+data.id, data, undefined);
};
const addUser = data => {
  return Axios.post("/users", data, undefined);
};
const getUser = idx => {
  return Axios.get("/users/"+idx, undefined, undefined);
};
const deleteUser = data => {
  return Axios.delete("/users/"+ data.id, data, undefined);
};
const forgotPassword = data => {
  return AxiosAuth.post("/forgot-password", data, undefined);
};
const resetPassword = data => {
  return AxiosAuth.post("/reset-password", data, undefined);
};
const getAllRoles = data => {
  return Axios.get("/roles?filters="+encodeURIComponent(JSON.stringify(data)), data, undefined);
};
const updateToken = data => {
  return AxiosAuth.post("/refresh-token", data, undefined);
};
const updateProfile = data => {
  return Axios.put("/api/Users/"+data.id, data, undefined);
};
const getMyAccount = async () => {
  return await Axios.get("/api/Users/Profile", undefined, undefined);
};
const updateMyAccount = async (data) => {
  return await Axios.put("/api/Users/Profile", data, undefined);
};
const updateStatus = (userId, status) => {
  return Axios.put("/api/UserStatus/"+userId+"/"+status, undefined, undefined);
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
  getAllRoles,
  updateToken,
  updateProfile,
  getMyAccount,
  updateMyAccount,
  updateStatus
};
