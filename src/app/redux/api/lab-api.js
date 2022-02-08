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

export default {
  getLabs,
  getGlobalLabs,
  addLab,
  updateLab,
  uploadLabLogo,
  removeLabLogo,
  getLab,
  deleteLab
};
