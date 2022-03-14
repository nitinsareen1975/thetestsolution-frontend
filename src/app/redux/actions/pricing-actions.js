import API from "../api/pricing-api";

export function getPricingList({filters,pagination,sorter}) {
  return async function (dispatch, getState) {
    return await API.getPricingList({filters: filters,pagination: pagination,sorter: sorter});
  };
}

export function addPricing(data) {
  return async function (dispatch, getState) {
    return await API.addPricing(data);
  }
}

export function updatePricing(id, data) {
  return async function (dispatch, getState) {
    return await API.updatePricing(id, data);
  };
}

export function getPricing(idx) {
  return async function (dispatch, getState) {
    return await API.getPricing(idx);
  };
}
