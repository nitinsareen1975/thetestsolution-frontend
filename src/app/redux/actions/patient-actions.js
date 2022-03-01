import API from "../api/patient-api";

export function getPatients({filters,pagination,sorter}) {
  return async function (dispatch, getState) {
    return await API.getPatients({filters: filters,pagination: pagination,sorter: sorter});
  };
}

export function getScheduledPatients({filters,pagination,sorter}) {
  return async function (dispatch, getState) {
    return await API.getPatients({filters: {progress_status: 1,...filters},pagination: pagination,sorter: sorter});
  };
}

export function getCheckedinPatients({filters,pagination,sorter}) {
  return async function (dispatch, getState) {
    return await API.getPatients({filters: {progress_status: 2,...filters},pagination: pagination,sorter: sorter});
  };
}

export function getCompletedPatients({filters,pagination,sorter}) {
  return async function (dispatch, getState) {
    return await API.getCompletedPatients({filters:filters,pagination: pagination,sorter: sorter});
  };
}

export function registerPatient(data) {
  return async function (dispatch, getState) {
    return await API.registerPatient(data);
  }
}

export function addPatient(data) {
  return async function (dispatch, getState) {
    return await API.addPatient(data);
  }
}

export function updatePatient(id, data) {
  return async function (dispatch, getState) {
    return await API.updatePatient(id, data);
  };
}

export function getPatient(idx) {
  return async function (dispatch, getState) {
    return await API.getPatient(idx);
  };
}

export function deletePatient(idx) {
  return async function (dispatch, getState) {
    return await API.deletePatient(idx);
  };
}

export function getPatientPricingInfo(patientId, pricingId) {
  return async function (dispatch, getState) {
    return await API.getPatientPricingInfo(patientId, pricingId);
  };
}

export function savePatientResults(patientId, data) {
  return async function (dispatch, getState) {
    return await API.savePatientResults(patientId, data);
  };
}