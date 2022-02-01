let AppConfig = window.AppConfig || {};
module.exports = {
  API: AppConfig && AppConfig.API ? AppConfig.API : "http://localhost:3010",
  AuthAPI: AppConfig && AppConfig.AuthAPI ? AppConfig.AuthAPI : "http://localhost:3010",
  DASHBOARD_URL: AppConfig && AppConfig.DASHBOARD_URL ? AppConfig.DASHBOARD_URL : "http://localhost:3010",
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
  TestTypes: AppConfig && AppConfig.TestTypes
    ? AppConfig.TestTypes
    : [{
      'id': 1,
      'name': 'Test 1',
      'status': 1
    },
    {
      'id': 2,
      'name': 'Test 2',
      'status': 1
    },
    {
      'id': 3,
      'name': 'Test 3',
      'status': 1
    },
    {
      'id': 4,
      'name': 'Test 4',
      'status': 1
    },
    {
      'id': 5,
      'name': 'Test 5',
      'status': 1
    }]
};
