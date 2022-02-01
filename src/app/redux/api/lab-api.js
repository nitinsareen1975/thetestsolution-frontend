import Axios from "../../services/axios-service";

const getLabs = data => {
  return Axios.get("/labs", data, undefined);
};
const updateLab = (id, data) => {
  return Axios.put("/labs/"+id, data, undefined);
};
const uploadLabLogo = (key, id, data) => {
  return Axios.post("/upload/"+key+"/"+id, data, undefined);
};
const removeLabLogo = (key, id) => {
  return Axios.delete("/upload/"+key+"/"+id, undefined, undefined);
};
const addLab = data => {
  return Axios.post("/labs", data, undefined);
};
const getLab = idx => {
  return Axios.get("/labs/"+idx, undefined, undefined);
};
const deleteLab = data => {
  return Axios.delete("/labs/"+ data.id, data, undefined);
};

export default {
  getLabs,
  addLab,
  updateLab,
  uploadLabLogo,
  removeLabLogo,
  getLab,
  deleteLab
};
