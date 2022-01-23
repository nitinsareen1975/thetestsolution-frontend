import AxiosLib from "./lib/http-axios-lib";
import AxiosAuth from "./lib/http-axios-lib-auth";
import config from "../config";
const _request = async (method, url, data, token, hitCount) => {
  if(hitCount > 2){
    window.location.href = "/login";
  }
  let options = {
    method: method,
    url: url,
    responseType: "json"
  };
  if (data && method === "GET") {
    options.params = data;
  } else if (data) {
    options.data = data;
    options.headers = {
      "Content-Type": "application/json;charset=UTF-8"
    };
  }

  return new Promise(async (resolve, reject) => {
    AxiosLib.request(options, token)
      .then(async (response) => {
          let data = response.data;
          if (typeof data != "object") data = JSON.parse(data);
          resolve(data);
      })
      .catch(error => {
        if(error.response && error.response.status === 401){
          refreshToken(method, url, data, hitCount,reject);
        } /* else {
          if(window.location.pathname.indexOf('404') <= -1){
            window.location = "/404";
          }
        } */
        reject(error);
      })
  })
};

const refreshToken = async (method, url, data, hitCount,reject) => {
    var tokenData = JSON.parse(localStorage.getItem("tokenData"))
    if(tokenData && tokenData !== null){
      var objTokenData = {
        "accessToken": tokenData.token,
        "refreshToken": tokenData.refreshToken
      }
      let optionsToken = {
        method: "POST",
        url: "/api/AuthV2/refreshtoken",
        responseType: "json",
        data:objTokenData,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      };
      
      AxiosAuth.request(optionsToken, undefined)
      .then(async (responseToken) => {
        if(responseToken.status === 200){
          var tokenResponseData = responseToken.data;
          var expiry = new Date();
          expiry.setSeconds( expiry.getSeconds() + tokenResponseData.accessToken.expiresIn );
          var newTokenData = {
            "token_expiry":expiry,
            "token":tokenResponseData.accessToken.token,
            "refreshToken":tokenResponseData.refreshToken
          }
          localStorage.setItem("tokenData", JSON.stringify(newTokenData));
          _request(method, url, data, tokenResponseData.accessToken.token, hitCount+ 1)
        }
      })
      .catch(error => {
        window.location.href = "/login";
        reject(error);
      })
    }
      
};

const DataAccessService1 = {
  get(url, data, token) {
    return _request("GET", url, data, token,1);
  },
  post(url, data, token) {
    return _request("POST", url, data, token,1);
  },
  delete(url, token) {
    return _request("DELETE", url, undefined, token,1);
  },
  put(url, data, token) {
    return _request("PUT", url, data, token,1);
  },
  patch(url, data, token) {
    return _request("PATCH", url, data, token,1);
  }
};

const DataAccessService = {
  get(url, data, token) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    return getFetchMethod(url) === "fake"
      ? fetch(`${config.API1}` + url, requestOptions)
      : DataAccessService1.get(url, data, token);
  },
  post(url, data, token) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    return getFetchMethod(url) === "fake"
      ? fetch(`${config.API1}` + url, requestOptions)
      : DataAccessService1.post(url, data, token);
  },
  delete(url, data, token) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    return getFetchMethod(url) === "fake"
      ? fetch(`${config.API1}` + url, requestOptions)
      : DataAccessService1.delete(url, undefined, token);
  },
  put(url, data, token) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    return getFetchMethod(url) === "fake"
      ? fetch(`${config.API1}` + url, requestOptions)
      : DataAccessService1.put(url, data, token);
  },
  patch(url, data, token) {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    return getFetchMethod(url) === "fake"
      ? fetch(`${config.API1}` + url, requestOptions)
      : DataAccessService1.patch(url, data, token);
  }
};

function getFetchMethod(url, data, token) {
  /* special cases to ignore due to indexof  */
  if(url.indexOf("/organization-types") > -1){
    return "fake";
  }
  /* special cases to ignore due to indexof  */

  if (url.indexOf("/api/GetOrderList") !== -1) {
    return "real";
  }
  if (url.indexOf("/api/order") !== -1 || url.indexOf("/api/addorder") !== -1) {
    return "real";
  }
  if (url.indexOf("/api/Product") !== -1) {
    return "real";
  }
  if (url.indexOf("/api/updateproduct") !== -1) {
    return "real";
  }
  if (url.indexOf("/api/addproduct") !== -1) {
    return "real";
  }
  if (url.indexOf("/api/updatestatus") !== -1) {
    return "real";
  }
  if (url.indexOf("/countryreport/AF") !== -1) {
    return "real";
  }
  if (url.indexOf("/api/geocode") !== -1) {
    return "real";
  }
  if (
    url.indexOf("/api/ForgotPassword") !== -1 ||
    url.indexOf("/api/GetCountryList") !== -1 ||
    url.indexOf("/api/applypromooffer") !== -1 ||
    url.indexOf("/api/submitorder") !== -1 ||
    url.indexOf("/api/Users") !== -1 ||
    url.indexOf("/api/Roles") !== -1 ||
    url.indexOf("/api/price/getproductsprice") !== -1 ||
    url.indexOf("/api/Price") !== -1 ||
    url.indexOf("/api/traveler") !== -1 ||
    url.indexOf("/api/RiskLineRegionWiseCountryList") !== -1 ||
    url.indexOf("/api/DayPackages") !== -1 ||
    url.indexOf("/api/Tiers") !== -1 ||
    url.indexOf("api/TravelerExists") !== -1 ||
    url.indexOf("/api/Country/") !== -1 ||
    url.indexOf("/api/PromoOffers") !== -1 ||
    url.indexOf("/api/users/travelerbasicinfo") !== -1 ||
    url.indexOf("/api/completeproductinfo") !== -1 ||
    url.indexOf("/api/CountryInfo") !== -1 ||
    url.indexOf("/api/InterstedGeos/Geofence") !== -1 ||
    url.indexOf("/api/InterstedGeos/AssetTracking") !== -1 ||
    url.indexOf("/api/InterstedGeos/AddGeofenc") !== -1 ||
    url.indexOf("/api/Organization/onboard") !== -1 ||
    url.indexOf("/api/PCC/PCCList") !== -1 ||
    url.indexOf("/api/PCC/PCCAccountList") !== -1 ||
    url.indexOf("/api/OrganizationUsers") !== -1 ||
    url.indexOf("/api/organization") !== -1 ||
    url.indexOf("/api/InterstedGeoFenceRules") !== -1 ||
    url.indexOf("/api/OrganizationUsers") !== -1 ||
    url.indexOf("/api/AlertTypes") !== -1 ||
    url.indexOf("/api/InterstedGeoRules") !== -1 ||
    url.indexOf("/api/AssignLicenses") !== -1 ||
    url.indexOf("/api/UnAssignLicense") !== -1 ||
    url.indexOf("/api/Organization") !== -1 ||
    url.indexOf("/api/Device") !== -1 ||
    url.indexOf("/api/License") !== -1 ||
    url.indexOf("/api/Users/AssignIdentity/" !== -1) ||
    url.indexOf("/api/TravellerItinerary/" !== -1 ||
    url.indexOf("/api/CustomAlert/") !== -1 || 
    url.indexOf("/api/B2B2C") !== -1 || 
    url.indexOf("/api/PlanTypes") !== -1 ||
    url.indexOf("/api/ResellerPackages") !== -1 
    )
  ) {
    return "real";
  } else {
    return "fake";
  }
}

export default DataAccessService;
