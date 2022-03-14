import Axios from "../../services/axios-service";

const getPricingList = data => {
  return Axios.get("/api/pricing", data, undefined);
};
const updatePricing = (id, data) => {
  return Axios.put("/api/pricing/"+id, data, undefined);
};
const addPricing = data => {
  return Axios.post("/api/pricing", data, undefined);
};
const getPricing = idx => {
  return Axios.get("/api/pricing/"+idx, undefined, undefined);
};
const getGlobalPricing = (data) => {
  return Axios.get("/global/pricing", data, undefined);
};
export default {
  getPricingList,
  updatePricing,
  addPricing,
  getPricing,
  getGlobalPricing
};
