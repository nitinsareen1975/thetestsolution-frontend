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
const getTestTypeMethods = () => {
  return Axios.get("/api/test-type-methods", undefined, undefined);
};
const deleteTestType = data => {
  return Axios.delete("/api/test-types/"+ data.id, data, undefined);
};
const updateTestTypeMethod = (id,data) => {
  return Axios.put("/api/test-type-methods/"+ id, data, undefined);
};
const addTestTypeMethod = (data) => {
  return Axios.post("/api/test-type-methods", data, undefined);
};
const getTestTypeMethod = (id) => {
  return Axios.get("/api/test-type-methods/"+ id, undefined, undefined);
};


const getTestTypeNames = data => {
  return Axios.get("/api/test-type-names", data, undefined);
};
const updateTestTypeName = (id, data) => {
  return Axios.put("/api/test-type-names/"+id, data, undefined);
};
const addTestTypeName = data => {
  return Axios.post("/api/test-type-names", data, undefined);
};
const getTestTypeName = idx => {
  return Axios.get("/api/test-type-names/"+idx, undefined, undefined);
};
const deleteTestTypeName = data => {
  return Axios.delete("/api/test-type-names/"+ data.id, data, undefined);
};


const getTestResultTypes = data => {
  return Axios.get("/api/test-result-types", data, undefined);
};
const updateTestResultType = (id, data) => {
  return Axios.put("/api/test-result-types/"+id, data, undefined);
};
const addTestResultType = data => {
  return Axios.post("/api/test-result-types", data, undefined);
};
const getTestResultType = idx => {
  return Axios.get("/api/test-result-types/"+idx, undefined, undefined);
};
const deleteTestResultType = data => {
  return Axios.delete("/api/test-result-types/"+ data.id, data, undefined);
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
  deleteTestType,
  getTestTypeMethods,
  updateTestTypeMethod,
  addTestTypeMethod,
  getTestTypeMethod,
  getTestTypeNames,
  updateTestTypeName,
  addTestTypeName,
  getTestTypeName,
  deleteTestTypeName,
  getTestResultTypes,
  updateTestResultType,
  addTestResultType,
  getTestResultType,
  deleteTestResultType
};
