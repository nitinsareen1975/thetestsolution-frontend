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

export function getTestTypeMethods() {
  return async function (dispatch, getState) {
    return await API.getTestTypeMethods();
  };
}
export function getTestTypeMethod(id) {
  return async function (dispatch, getState) {
    return await API.getTestTypeMethod(id);
  };
}
export function updateTestTypeMethod(idx,data) {
  return async function (dispatch, getState) {
    return await API.updateTestTypeMethod(idx,data);
  };
}

export function addTestTypeMethod(data) {
  return async function (dispatch, getState) {
    return await API.addTestTypeMethod(data);
  };
}

export function getTestTypeNames({filters,pagination,sorter}) {
  return async function (dispatch, getState) {
    return await API.getTestTypeNames({filters: filters,pagination: pagination,sorter: sorter});
  };
}

export function addTestTypeName(data) {
  return async function (dispatch, getState) {
    return await API.addTestTypeName(data);
  }
}

export function updateTestTypeName(id, data) {
  return async function (dispatch, getState) {
    return await API.updateTestTypeName(id, data);
  };
}

export function getTestTypeName(idx) {
  return async function (dispatch, getState) {
    return await API.getTestTypeName(idx);
  };
}

export function deleteTestTypeName(idx) {
  return async function (dispatch, getState) {
    return await API.deleteTestTypeName(idx);
  };
}



export function getTestResultTypes({filters,pagination,sorter}) {
  return async function (dispatch, getState) {
    return await API.getTestResultTypes({filters: filters,pagination: pagination,sorter: sorter});
  };
}

export function addTestResultType(data) {
  return async function (dispatch, getState) {
    return await API.addTestResultType(data);
  }
}

export function updateTestResultType(id, data) {
  return async function (dispatch, getState) {
    return await API.updateTestResultType(id, data);
  };
}

export function getTestResultType(idx) {
  return async function (dispatch, getState) {
    return await API.getTestResultType(idx);
  };
}

export function deleteTestResultType(idx) {
  return async function (dispatch, getState) {
    return await API.deleteTestResultType(idx);
  };
}