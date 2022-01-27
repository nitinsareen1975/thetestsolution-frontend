let AppConfig = window.AppConfig || {};
module.exports = {
  //API: AppConfig && AppConfig.API ? AppConfig.API : "http://api.thetestsolutions.com:8081/api/",
  //AuthAPI: AppConfig && AppConfig.AuthAPI ? AppConfig.AuthAPI : "http://api.thetestsolutions.com:8081/auth/",
  API: AppConfig && AppConfig.API ? AppConfig.API : "http://localhost:3010",
  AuthAPI: AppConfig && AppConfig.AuthAPI ? AppConfig.AuthAPI : "http://localhost:3010",
  DASHBOARD_URL: AppConfig && AppConfig.DASHBOARD_URL ? AppConfig.DASHBOARD_URL : "http://localhost:3010"
};
