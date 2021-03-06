import Axios from "../../services/axios-service";

const getAll = (data) => {
  return Axios.get("/api/reports", data, undefined);
};

const exportData = (format, data) => {
  return Axios.get("/api/reports/export/"+format, data, undefined);
};
const exportGroupData = (format, data) => {
  return Axios.get("/api/group-reports/export/"+format, data, undefined);
};
export default {
  getAll,
  exportData,
  exportGroupData
};
