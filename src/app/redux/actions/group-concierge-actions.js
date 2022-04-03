import API from "../api/group-concierge-api";

export function getGroupEvents({filters,pagination,sorter}) {
  return async function (dispatch, getState) {
    return await API.getGroupEvents({filters: filters,pagination: pagination,sorter: sorter});
  };
}
export function addGroupEvent(data) {
  return async function (dispatch, getState) {
    return await API.addGroupEvent(data);
  }
}
export function updateGroupEvent(id, data) {
  return async function (dispatch, getState) {
    return await API.updateGroupEvent(id, data);
  };
}
export function getGroupEvent(idx) {
  return async function (dispatch, getState) {
    return await API.getGroupEvent(idx);
  };
}

export function getGroupPatients({filters,pagination,sorter}) {
  return async function (dispatch, getState) {
    return await API.getGroupPatients({filters: filters,pagination: pagination,sorter: sorter});
  };
}
export function addGroupPatient(data) {
  return async function (dispatch, getState) {
    return await API.addGroupPatient(data);
  }
}
export function updateGroupPatient(id, data) {
  return async function (dispatch, getState) {
    return await API.updateGroupPatient(id, data);
  };
}
export function getGroupPatient(idx) {
  return async function (dispatch, getState) {
    return await API.getGroupPatient(idx);
  };
}

export function groupConciergeResults(data) {
  return async function (dispatch, getState) {
    return await API.groupConciergeResults(data);
  };
}
export function uploadGroupEventAgreement(data) {
  return async function (dispatch, getState) {
    return await API.uploadGroupEventAgreement(data);
  };
}
export function removeGroupEventAgreement(data) {
  return async function (dispatch, getState) {
    return await API.removeGroupEventAgreement(data);
  };
}
export function completeRegistration(pid, gid) {
  return async function (dispatch, getState) {
    return await API.completeRegistration(pid, gid);
  };
}
export function saveAndCompleteRegistration(pid, gid, data) {
  return async function (dispatch, getState) {
    return await API.saveAndCompleteRegistration(pid, gid, data);
  };
}