import Axios from "../../services/axios-service";

const getTests = data => {
  return Axios.get("/api/tests", data, undefined);
};
const updateTest = (id, data) => {
  return Axios.put("/api/tests/"+id, data, undefined);
};
const addTest = data => {
  return Axios.post("/api/tests", data, undefined);
};
const getTest = idx => {
  return Axios.get("/api/tests/"+idx, undefined, undefined);
};
const deleteTest = data => {
  return Axios.delete("/api/tests/"+ data.id, data, undefined);
};

const getTestTypes = data => {
  return Axios.get("/api/test-types", data, undefined);
};
const getGlobalTestTypes = data => {
  return Axios.get("/global/test-types", data, undefined);
};
const updateTestType = (id, data) => {
  return Axios.put("/api/test-types/"+id, data, undefined);
};
const addTestType = data => {
  return Axios.post("/api/test-types", data, undefined);
};
const getTestType = idx => {
  return Axios.get("/api/test-types/"+idx, undefined, undefined);
};
const deleteTestType = data => {
  return Axios.delete("/api/test-types/"+ data.id, data, undefined);
};

export default {
  getTests,
  updateTest,
  addTest,
  getTest,
  deleteTest,
  getTestTypes,
  getGlobalTestTypes,
  updateTestType,
  addTestType,
  getTestType,
  deleteTestType
};
