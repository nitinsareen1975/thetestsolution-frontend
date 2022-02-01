import API from "../api/lab-api";

export function getLabs({filters,pagination,sorter}) {
  return async function (dispatch, getState) {
    return await API.getLabs({filters: filters,pagination: pagination,sorter: sorter});
  };
}

export function addLab(data) {
  return async function (dispatch, getState) {
    return await API.addLab(data);
  }
}

export function updateLab(id, data) {
  return async function (dispatch, getState) {
    return await API.updateLab(id, data);
  };
}

export function uploadLabLogo(key, id, data) {
  return async function (dispatch, getState) {
    return await API.uploadLabLogo(key, id, data);
  };
}

export function removeLabLogo(key, id) {
  return async function (dispatch, getState) {
    return await API.removeLabLogo(key, id);
  };
}

export function getLab(idx) {
  return async function (dispatch, getState) {
    return await API.getLab(idx);
  };
}

export function deleteLab(idx) {
  return async function (dispatch, getState) {
    return await API.deleteLab(idx);
  };
}