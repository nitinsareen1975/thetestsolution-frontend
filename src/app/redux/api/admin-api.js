import Axios from "../../services/axios-service";

const getCountriesList = async () => {
  return await Axios.get("/api/get-countries", undefined, undefined);
};
const getCountriesListByRegion = async () => {
  return await Axios.get(
    "/api/get-region-countries",
    undefined,
    undefined
  );
};
const getMyAccount = async () => {
  return await Axios.get("/api/Users/Profile", undefined, undefined);
};
const updateMyAccount = async data => {
  return await Axios.put("/api/Users/Profile", data, undefined);
};
const getPatientStatusList = async () => {
  return await Axios.get("/global/patient-status-list", undefined, undefined);
};
const getPaymentMethods = async () => {
  return await Axios.get("/global/payment-methods", undefined, undefined);
};

export default {
  getCountriesList,
  getCountriesListByRegion,
  getMyAccount,
  updateMyAccount,
  getPatientStatusList,
  getPaymentMethods
};
