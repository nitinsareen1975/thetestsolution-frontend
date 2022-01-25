import Axios from "../../services/axios-service";

const getRoles = data => {
  return Axios.get("/roles?filters="+encodeURIComponent(JSON.stringify(data)), undefined, undefined);
};

const updateRole = data => {
  return Axios.put("/roles/"+data.id, data, undefined);
};

const getRole = idx => {
  return Axios.get("/roles/"+idx, undefined, undefined);
};

const deleteRole = data => {
  return Axios.delete("/roles/"+ data.id, data, undefined);
};
const addRole = data => {
  return Axios.post("/roles/", data, undefined);
};

const getAllExternalRoles = data => {
  return Axios.get("/roles/ExternalRoles", undefined, undefined);
};

const getAllInternalRoles = data => {
  return Axios.get("/roles/InternalRoles", undefined, undefined);
};

export default {
    getRoles,
    updateRole,
    getRole,
    deleteRole,
    addRole,
    getAllExternalRoles,
    getAllInternalRoles
};
