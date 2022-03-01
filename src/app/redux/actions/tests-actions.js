import API from "../api/tests-api";

export function getTests({filters,pagination,sorter}) {
  return async function (dispatch, getState) {
    return await API.getTests({filters: filters,pagination: pagination,sorter: sorter});
  };
}

export function addTest(data) {
  return async function (dispatch, getState) {
    return await API.addTest(data);
  }
}

export function updateTest(id, data) {
  return async function (dispatch, getState) {
    return await API.updateTest(id, data);
  };
}

export function getTest(idx) {
  return async function (dispatch, getState) {
    return await API.getTest(idx);
  };
}

export function deleteTest(idx) {
  return async function (dispatch, getState) {
    return await API.deleteTest(idx);
  };
}


export function getTestTypes({filters,pagination,sorter}) {
  return async function (dispatch, getState) {
    return await API.getTestTypes({filters: filters,pagination: pagination,sorter: sorter});
  };
}

export function addTestType(data) {
  return async function (dispatch, getState) {
    return await API.addTestType(data);
  }
}

export function updateTestType(id, data) {
  return async function (dispatch, getState) {
    return await API.updateTestType(id, data);
  };
}

export function getTestType(idx) {
  return async function (dispatch, getState) {
    return await API.getTestType(idx);
  };
}

export function deleteTestType(idx) {
  return async function (dispatch, getState) {
    return await API.deleteTestType(idx);
  };
}

export function getTestTypeMethods(idx) {
  return async function (dispatch, getState) {
    return await API.getTestTypeMethods(idx);
  };
}

export function updateTestTypeMethods(idx,data) {
  return async function (dispatch, getState) {
    return await API.updateTestTypeMethods(idx,data);
  };
}