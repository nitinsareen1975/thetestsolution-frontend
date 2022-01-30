import Axios from "../../services/axios-service";

const getCountriesList = async () => {
  return await Axios.get("/get-countries", undefined, undefined);
};
const getCountriesListByRegion = async () => {
  return await Axios.get(
    "/get-region-countries",
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

export default {
  getCountriesList,
  getCountriesListByRegion,
  getMyAccount,
  updateMyAccount
};
