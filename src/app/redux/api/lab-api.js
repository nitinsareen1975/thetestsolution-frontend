import Axios from "../../services/axios-service";

const getLabs = data => {
  return Axios.get("/api/labs", data, undefined);
};
const getGlobalLabs = data => {
  return Axios.get("/global/labs", data, undefined);
};
const updateLab = (id, data) => {
  return Axios.put("/api/labs/"+id, data, undefined);
};
const uploadLabLogo = (key, id, data) => {
  return Axios.post("/api/upload/"+key+"/"+id, data, undefined);
};
const removeLabLogo = (key, id) => {
  return Axios.delete("/api/upload/"+key+"/"+id, undefined, undefined);
};
const addLab = data => {
  return Axios.post("/api/labs", data, undefined);
};
const getLab = idx => {
  return Axios.get("/api/labs/"+idx, undefined, undefined);
};
const deleteLab = data => {
  return Axios.delete("/api/labs/"+ data.id, data, undefined);
};
const updateLabPricing = (id, data) => {
  return Axios.post("/api/lab-pricing/"+ id, data, undefined);
};
const getLabPricing = (id) => {
  return Axios.get("/api/lab-pricing/"+ id, undefined, undefined);
};
const getGlobalLabPricing = (id, data) => {
  return Axios.get("/global/lab-pricing/"+id, data, undefined);
};
const getGlobalLab = id => {
  return Axios.get("/global/labs/"+id, undefined, undefined);
};
const updateLabSettings = (data) => {
  return Axios.put("/api/update-lab", data, undefined);
};
export default {
  getLabs,
  getGlobalLabs,
  addLab,
  updateLab,
  uploadLabLogo,
  removeLabLogo,
  getLab,
  deleteLab,
  updateLabPricing,
  getLabPricing,
  getGlobalLabPricing,
  getGlobalLab,
  updateLabSettings
};
