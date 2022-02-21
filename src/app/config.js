let AppConfig = window.AppConfig || {};
module.exports = {
  API: AppConfig && AppConfig.API ? AppConfig.API : "http://localhost:3010",
  AuthAPI: AppConfig && AppConfig.AuthAPI ? AppConfig.AuthAPI : "http://localhost:3010",
  DASHBOARD_URL: AppConfig && AppConfig.DASHBOARD_URL ? AppConfig.DASHBOARD_URL : "http://localhost:3010",
  WEB_URL: AppConfig && AppConfig.WEB_URL ? AppConfig.WEB_URL : "http://thetestsolution.com",
  GoogleMapsAPIkey: AppConfig && AppConfig.GoogleMapsAPIkey ? AppConfig.GoogleMapsAPIkey : "AIzaSyCoVs8aJnDlFzkJvbuvLaCfNKYt4Sa9Pes",
  StripeAPIKey: AppConfig && AppConfig.StripeAPIKey ? AppConfig.StripeAPIKey : "pk_test_51KTKxfSFRkwkjrHvuxg7yI3NQLRoc3gepGEoe7NABab8HrRuQbteyDaYlNfgVPee9U5sxLGwiGkbD88fpLJGt2hk00xXIvkWAm",
  StripeSecretKey: AppConfig && AppConfig.StripeSecretKey ? AppConfig.StripeSecretKey : "sk_test_51KTKxfSFRkwkjrHvXthrTNfrqiDR79zi6OGKdWnyiPmoLagFgXxQQLySq2jXKuzdl7YjPYqAYHc4G0NZt6cg26WR00SWKRjWUU"
};
