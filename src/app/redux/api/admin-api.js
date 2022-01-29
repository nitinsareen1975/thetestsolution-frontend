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
const getAllCovidData = async () => {
    console.log(await Axios.get("api/risklineAlert/covid/", undefined, undefined));
    return await Axios.get(
        "api/risklineAlert/covid/",
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
const getTotalSales = args => {
  return Axios.post("/api/DashBoard/TotalSale", args, undefined);
};
const getTotalIncome = args => {
  return Axios.post("/api/DashBoard/TotalIncome", args, undefined);
};
const getTotalProfit = args => {
  return Axios.post("/api/DashBoard/TotalProfit", args, undefined);
};
const getTotalSaleByProduct = args => {
  return Axios.post("/api/DashBoard/TotalSaleProductWise", args, undefined);
};
const checkInEventlog = args => {
  return Axios.post("/api/CheckInEventlog", args, undefined);
};

const getValidCountriesList = async () => {
  return await Axios.get("/api/GetValidCountryList ", undefined, undefined);
};
const getDashboardNotificationsData = args => {
  return Axios.post("/api/DashBoard/TotalEventSummary", args, undefined);
};
const getItinerariesOverview = args => {
  return Axios.get(
    "/api/iternary/fetchitinerariesOverview?orgId=" +
      args.orgId +
      "&startDate=" +
      args.startDate +
      "&endDate=" +
      args.endDate,
    undefined
  );
};

const loadEmergencyContacts = () => {
  return Axios.get("/api/CountryReport/EmergencyNum/", undefined, undefined);
};

const getResellerTotalOrders = args => {
  return Axios.post("/api/DashBoard/TotalResellerOrders", args, undefined);
};
const getResellerTotalProfit = args => {
  return Axios.post("/api/DashBoard/TotalResellerProfit", args, undefined);
};
const getResellerTotalSale = args => {
  return Axios.post("/api/DashBoard/ResellerTotalSaleProductWise", args, undefined);
};

const hasB2B2CEmergencyContact = (userId) => {
  return Axios.get("/api/B2B2CEmergencyContactExists/"+userId, undefined, undefined);
};

const updateB2B2CEmergencyContact = (userId, data) => {
  return Axios.put("/api/UpdateB2B2CEmergencyContact/"+userId, data, undefined);
};

export default {
  getCountriesList,
  getCountriesListByRegion,
  getAllCovidData,
  getMyAccount,
  updateMyAccount,
  getTotalSales,
  getTotalIncome,
  getTotalProfit,
  getTotalSaleByProduct,
  checkInEventlog,
  getValidCountriesList,
  getDashboardNotificationsData,
  getItinerariesOverview,
  loadEmergencyContacts,
  getResellerTotalOrders,
  getResellerTotalProfit,
  getResellerTotalSale,
  hasB2B2CEmergencyContact,
  updateB2B2CEmergencyContact
};
