let AppConfig = window.AppConfig || {};
module.exports = {
  API: AppConfig && AppConfig.API ? AppConfig.API : "http://localhost:3010",
  AuthAPI: AppConfig && AppConfig.AuthAPI ? AppConfig.AuthAPI : "http://localhost:3010",
  DASHBOARD_URL: AppConfig && AppConfig.DASHBOARD_URL ? AppConfig.DASHBOARD_URL : "http://localhost:3010",
  WEB_URL: AppConfig && AppConfig.WEB_URL ? AppConfig.WEB_URL : "http://thetestsolution.com",
  PaymentModes: AppConfig && AppConfig.PaymentModes
    ? AppConfig.PaymentModes
    : [{
      'id': 1,
      'name': 'Cheque',
      'status': 1
    },
    {
      'id': 2,
      'name': 'Wire Transfer',
      'status': 1
    },
    {
      'id': 3,
      'name': 'Net Banking',
      'status': 1
    },
    {
      'id': 4,
      'name': 'Paypal',
      'status': 1
    },
    {
      'id': 5,
      'name': 'Stripe',
      'status': 1
    }],
  ProgressStatusList: AppConfig && AppConfig.ProgressStatusList
    ? AppConfig.ProgressStatusList
    : [{
        id: 1,
        name: 'Scheduled'
      },
      {
        id: 2,
        name: 'Checked In'
      },
      {
        id: 3,
        name: 'Complete'
      }]
};
