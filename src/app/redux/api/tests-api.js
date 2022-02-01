import Axios from "../../services/axios-service";

const getTests = data => {
  return Axios.get("/tests", data, undefined);
};
const updateTest = (id, data) => {
  return Axios.put("/tests/"+id, data, undefined);
};
const addTest = data => {
  return Axios.post("/tests", data, undefined);
};
const getTest = idx => {
  return Axios.get("/tests/"+idx, undefined, undefined);
};
const deleteTest = data => {
  return Axios.delete("/tests/"+ data.id, data, undefined);
};

const getTestTypes = data => {
  return Axios.get("/test-types", data, undefined);
};
const updateTestType = (id, data) => {
  return Axios.put("/test-types/"+id, data, undefined);
};
const addTestType = data => {
  return Axios.post("/test-types", data, undefined);
};
const getTestType = idx => {
  return Axios.get("/test-types/"+idx, undefined, undefined);
};
const deleteTestType = data => {
  return Axios.delete("/test-types/"+ data.id, data, undefined);
};

export default {
  getTests,
  updateTest,
  addTest,
  getTest,
  deleteTest,
  getTestTypes,
  updateTestType,
  addTestType,
  getTestType,
  deleteTestType
};
