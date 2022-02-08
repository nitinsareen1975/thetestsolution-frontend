import Axios from "../../services/axios-service";

const uploadIdentifierDoc = (key, data) => {
  return Axios.post("/global/upload/"+key+"/", data, undefined);
};

export default {
  uploadIdentifierDoc
};
