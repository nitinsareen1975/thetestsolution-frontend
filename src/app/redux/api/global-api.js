import Axios from "../../services/axios-service";

const uploadIdentifierDoc = (key, data) => {
  return Axios.post("/global/upload/"+key+"/", data, undefined);
};
const resendConfirmationEmail = (code) => {
  return Axios.get("/global/resend-confirmation-email/"+code+"/", undefined, undefined);
};
export default {
  uploadIdentifierDoc,
  resendConfirmationEmail
};
