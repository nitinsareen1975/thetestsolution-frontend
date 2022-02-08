import Axios from "../../services/axios-service";

const login = data => {
  return Axios.post("/auth/login", data, undefined);
};
const getUserData = (data) => {
	return Axios.get("/api/validateToken", data, undefined);
};
const getUserListing = data => {
  return Axios.get("/api/users?filters="+encodeURIComponent(JSON.stringify(data)), data, undefined);
};
const updateUser = data => {
  return Axios.put("/api/users/"+data.id, data, undefined);
};
const addUser = data => {
  return Axios.post("/api/users", data, undefined);
};
const getUser = idx => {
  return Axios.get("/api/users/"+idx, undefined, undefined);
};
const deleteUser = data => {
  return Axios.delete("/api/users/"+ data.id, data, undefined);
};
const forgotPassword = data => {
  return Axios.post("/auth/forgot-password", data, undefined);
};
const resetPassword = data => {
  return Axios.post("/auth/reset-password", data, undefined);
};
const getAllRoles = data => {
  return Axios.get("/api/roles?filters="+encodeURIComponent(JSON.stringify(data)), data, undefined);
};
const updateToken = data => {
  return Axios.post("/auth/refresh-token", data, undefined);
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
