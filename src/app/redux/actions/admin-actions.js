import { Types } from "../constants/admin-types";
import API from "../api/admin-api";
import config from "../../config";

export function getCountriesList() {
  return async function(dispatch, _getState) {
    try {
      let countryAndTierInfo = await API.getCountriesList();
      dispatch({ type: Types.COUNTRIES_LIST, payload: countryAndTierInfo });
    } catch (e) {}
  };
}

export function myAccount() {
  return async function(_dispatch, _getState) {
    try {
      let resp = await API.getMyAccount();
      return resp;
    } catch (e) {
      return { error: true };
    }
  };
}

export function updateMyAccount(data) {
  return async function(_dispatch, _getState) {
    try {
      let resp = await API.updateMyAccount(data);
      return resp;
    } catch (e) {
      return { error: true };
    }
  };
}
export function getCountriesListName() {
  return async function(dispatch, _getState) {
    try {
      let countryAndTierInfo = await API.getCountriesList();
      return countryAndTierInfo.countries.filter(
        data => data.countryId !== config.allCountriesCountryId
      );
    } catch (e) {}
  };
}
export function getTotalSales(args) {
  return async function(_dispatch, _getState) {
    try {
      let resp = await API.getTotalSales(args);
      return resp;
    } catch (e) {
      return { error: true };
    }
  };
}
export function getTotalProfit(args) {
  return async function(_dispatch, _getState) {
    try {
      let resp = await API.getTotalProfit(args);
      return resp;
    } catch (e) {
      return { error: true };
    }
  };
}
export function getTotalIncome(args) {
  return async function(_dispatch, _getState) {
    try {
      let resp = await API.getTotalIncome(args);
      return resp;
    } catch (e) {
      return { error: true };
    }
  };
}
export function getTotalSaleByProduct(args) {
  return async function(_dispatch, _getState) {
    try {
      let resp = await API.getTotalSaleByProduct(args);
      return resp;
    } catch (e) {
      return { error: true };
    }
  };
}
export function getCountriesListFormatted() {
  return async function(dispatch, _getState) {
    try {
      let countryAndTierInfo = await API.getCountriesList();
      let countries = countryAndTierInfo.countries.filter(
        data => data.countryId !== config.allCountriesCountryId
      );
      countries.unshift({
        countryId: config.allCountriesCountryId,
        countryCode: config.allCountriesCountryCode,
        countryName: "All Countries",
        tierId: 1
      });
      return countries;
    } catch (e) {}
  };
}
export function getDashboardNotificationsData(args) {
  return async function(_dispatch, _getState) {
    try {
      let resp = await API.getDashboardNotificationsData(args);
      return resp;
    } catch (e) {
      return { error: true };
    }
  };
}

export function getItinerariesOverview(args) {
  return async function(_dispatch, _getState) {
    try {
      let resp = await API.getItinerariesOverview(args);
      return resp;
    } catch (e) {
      return { error: true };
    }
  };
}

export function loadEmergencyContacts() {
  return async function(dispatch, _getState) {
    try {
      let resp = await API.loadEmergencyContacts();
      dispatch({ type: Types.LOAD_EMERGENCY_CONTACTS, payload: resp.data });
    } catch (e) {
      return { error: true };
    }
  };
}

export function hasB2B2CEmergencyContact(userId) {
  return async function(_dispatch, _getState) {
    try {
      let response = await API.hasB2B2CEmergencyContact(userId);
      return response;
    } catch (e) {
      return { error: true };
    }
  };
}

export function updateB2B2CEmergencyContact(userId, data) {
  return async function(_dispatch, _getState) {
    try {
      let response = await API.updateB2B2CEmergencyContact(userId, data);
      return response;
    } catch (e) {
      return { error: true };
    }
  };
}
export function getResellerTotalOrders(args) {
  return async function(_dispatch, _getState) {
    try {
      return await API.getResellerTotalOrders(args);
    } catch (e) {
      return { error: true };
    }
  };
}
export function getResellerTotalProfit(args) {
  return async function(_dispatch, _getState) {
    try {
      return await API.getResellerTotalProfit(args);
    } catch (e) {
      return { error: true };
    }
  };
}
export function getResellerTotalSale(args) {
  return async function(_dispatch, _getState) {
    try {
      return await API.getResellerTotalSale(args);
    } catch (e) {
      return { error: true };
    }
  };
}
