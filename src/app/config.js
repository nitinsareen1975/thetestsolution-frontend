let FPConfing = window.FPConfing || {};
module.exports = {
  API1:
    FPConfing && FPConfing.API1
      ? FPConfing.API1
      : "https://dev.api.captravelassistance.com",
  API2:
    FPConfing && FPConfing.API2
      ? FPConfing.API2
      : "http://dev.auth.captravelassistance.com:9003/",
  API3:
    FPConfing && FPConfing.API3
      ? FPConfing.API3
      : "https://dev.api.captravelassistance.com",
  DASHBOARD_URL:
    FPConfing && FPConfing.DASHBOARD_URL
      ? FPConfing.DASHBOARD_URL
      : "https://dev.api.captravelassistance.com:3000",
  allCountriesCountryId:
    FPConfing && FPConfing.allCountriesCountryId
      ? FPConfing.allCountriesCountryId
      : 277,
  allCountriesCountryCode:
    FPConfing && FPConfing.allCountriesCountryCode
      ? FPConfing.allCountriesCountryCode
      : "All",
  stripeKey:
    FPConfing && FPConfing.stripeKey
      ? FPConfing.stripeKey
      : "pk_test_xE1A4jL9sDBnyBWljkVfKD0S00CPA7kVzU",
  b2cBaseUrl: "/cap",
  b2b2cBaseUrl: "/partner",
  wpEditQuoteUrl: "https://captravelassistance.com/quote-results",
  wpProductToOrder: 1
};
