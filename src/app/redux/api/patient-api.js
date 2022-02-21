import Axios from "../../services/axios-service";

const getPatients = data => {
  return Axios.get("/api/patients", data, undefined);
};
const updatePatient = (id, data) => {
  return Axios.put("/api/patients/"+id, data, undefined);
};
const addPatient = data => {
  return Axios.post("/api/patients", data, undefined);
};
const registerPatient = data => {
  return Axios.post("/global/register-patient", data, undefined);
};
const getPatient = idx => {
  return Axios.get("/api/patients/"+idx, undefined, undefined);
};
const deletePatient = data => {
  return Axios.delete("/api/patients/"+ data.id, data, undefined);
};
const removeIdentifierDoc = (key, id) => {
  return Axios.delete("/api/upload/"+key+"/"+id, undefined, undefined);
};
const getTransactionDetails = (data) => {
  return Axios.get("/api/payments", data, undefined);
};
const refundTransaction = (data) => {
  return Axios.post("/api/payments/refund", data, undefined);
};
export default {
  getPatients,
  addPatient,
  registerPatient,
  updatePatient,
  getPatient,
  deletePatient,
  removeIdentifierDoc,
  getTransactionDetails,
  refundTransaction
};
