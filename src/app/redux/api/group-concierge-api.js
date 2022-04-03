import Axios from "../../services/axios-service";

const getGroupEvents = data => {
  return Axios.get("/api/group-events", data, undefined);
};
const updateGroupEvent = (id, data) => {
  return Axios.put("/api/group-events/"+id, data, undefined);
};
const addGroupEvent = data => {
  return Axios.post("/api/group-events", data, undefined);
};
const getGroupEvent = idx => {
  return Axios.get("/api/group-events/"+idx, undefined, undefined);
};

const getGroupPatients = data => {
  return Axios.get("/api/group-patients", data, undefined);
};
const updateGroupPatient = (id, data) => {
  return Axios.put("/api/group-patients/"+id, data, undefined);
};
const addGroupPatient = data => {
  return Axios.post("/api/group-patients", data, undefined);
};
const getGroupPatient = idx => {
  return Axios.get("/api/group-patients/"+idx, undefined, undefined);
};

const groupConciergeResults = (data) => {
  return Axios.get("/api/group-concierge-results", data, undefined);
};
const uploadGroupEventAgreement = (data) => {
  return Axios.post("/api/upload-group-event-agreement", data, undefined);
};
const removeGroupEventAgreement = (data) => {
  return Axios.post("/api/remove-group-event-agreement", data, undefined);
};
const completeRegistration = (pid, gid) => {
  return Axios.get("/api/complete-registration/"+pid+"/"+gid, undefined, undefined);
};
const saveAndCompleteRegistration = (pid, gid, data) => {
  return Axios.post("/api/save-and-complete-registration/"+pid+"/"+gid, data, undefined);
};
const getPreRegistrationQRCodePDF = (data) => {
  return Axios.post("/global/pre-registration-qrcode-pdf", data, undefined);
};

const getGlobalGroupEvent = idx => {
  return Axios.get("/global/group-events/"+idx, undefined, undefined);
};
const addGlobalGroupPatient = data => {
  return Axios.post("/global/group-patients", data, undefined);
};

export default {
  getGroupEvents,
  addGroupEvent,
  updateGroupEvent,
  getGroupEvent,
  getGroupPatients,
  updateGroupPatient,
  addGroupPatient,
  getGroupPatient,
  groupConciergeResults,
  uploadGroupEventAgreement,
  removeGroupEventAgreement,
  completeRegistration,
  saveAndCompleteRegistration,
  getPreRegistrationQRCodePDF,
  getGlobalGroupEvent,
  addGlobalGroupPatient
};
