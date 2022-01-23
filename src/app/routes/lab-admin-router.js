import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import UserProfile from "../components/user-dash/user-profile/user-profile";
import UserInvoice from "../components/user-dash/user-invoice/user-invoice";
import UserHistory from "../components/user-dash/user-history/user-history";
//import UpdateItinerary from "../components/admin-dash/manage-itinerary/update-itinerary";
import UpdateItinerary from "../components/admin-dash/manage-itinerary/update-manual-itinerary";
import Countries from "../components/admin-dash/countries";
import CountriesInfo from "../components/admin-dash/countries/infos";
import Orders from "../components/admin-dash/orders";
import ViewOrder from "../components/admin-dash/orders/view";
import UserHome from "../components/user-dash/user-home/user-home";
import UserCovid from "../components/user-dash/user-covid/user-covid";
import UserChangePassword from "../components/user-dash/user-profile/change-password";
import Organizations from "../components/admin-dash/organizations/list";
import EditOrganization from "../components/admin-dash/organizations/edit-organization/edit-organization";
import EditOrganizationEmployees from "../components/admin-dash/organizations/edit-organization/employees/list";
import EditOrganizationEmployee from "../components/admin-dash/organizations/edit-organization/employees/edit";
import OrganizationLicenseList from "../components/admin-dash/organizations/edit-organization/license/list";
import EditOrganizationLicense from "../components/admin-dash/organizations/edit-organization/license/edit";
import OrganizationOrderHistory from "../components/admin-dash/organizations/order-history/order-history";
import ViewOrganizationOrder from "../components/admin-dash/organizations/order-history/view";
import EditItinerary from "../components/admin-dash/manage-itinerary/edit";
import EditManualItinerary from "../components/admin-dash/manage-itinerary/editItinerary";
import GeoFencingList from "../components/admin-dash/maps/geo-fencing-list";
import Maps from "../components/admin-dash/maps/view";
import AreaInterest from "../components/admin-dash/area-interest/area-interest";
import AssetTracking from "../components/admin-dash/area-interest/index";
import ListDivisonOrganization from "../components/admin-dash/organizations/division/list-division";
import EditDivisonOrganization from "../components/admin-dash/organizations/division/edit-division/edit-division";
import AddDivisonOrganization from "../components/admin-dash/organizations/division/add-division/add-division";

import OrganizationAuditLogs from "../components/admin-dash/organizations/audit-logs";
import TravellerItinerayMapComponent from "../components/user-dash/dashboard-travel-manager/traveler-map/itinerary-details-map";

import CustomAlertList from "../components/admin-dash/custom-alert/index";
import CustomAlert from "../components/admin-dash/custom-alert/custom-alert";
import CustomAlertView from "../components/admin-dash/custom-alert/custom-alert-view";
import AccountBilling from "../components/admin-dash/accounts-billing";
import OrganizationInvoice from "../components/admin-dash/accounts-billing/organization-account/view-invoice";
import TravelerItineraryViewer from "../components/user-dash/dashboard-travel-manager/traveler-map/traveler-itinerary-viewer";
import TravelerManualItineraryViewer from "../components/user-dash/dashboard-travel-manager/traveler-map/traveler-manualitinerary-viewer";
import Notifications from "../components/Notifications/notifications";
import ViewNotification from "../components/Notifications/view";
import ActiveTravelerList from "../components/admin-dash/reports/active-traveler-list/index";
import WhereareTravelers from "../components/admin-dash/reports/where-my-travelers/index";
import TravelersbyDestDate from "../components/admin-dash/reports/travelers-by-dest-date/index";
import TravelersRiskLevel from "../components/admin-dash/reports/travelers-by-risk-level/index";
import WhereareTravelersResult from "../components/admin-dash/reports/where-my-travelers/search";
import TravelersbyDestDatersResult from "../components/admin-dash/reports/travelers-by-dest-date/search";
import EmployeesonthesameFlight from "../components/admin-dash/reports/Employees-on-the-same-flight/index";
import DomesticInternational from "../components/admin-dash/reports/domestic-international/index";
import DomesticInternationalResult from "../components/admin-dash/reports/domestic-international/search";
import SegmentAnalysis from "../components/admin-dash/reports/segment-analysis-report/index";
import AirportReport from "../components/admin-dash/reports/airport-report/index";
import AirportResult from "../components/admin-dash/reports/airport-report/search";
import ArrivalReport from "../components/admin-dash/reports/arrival-report/index";
import ArrivalResult from "../components/admin-dash/reports/arrival-report/search";
// import arrivalReport from "../components/admin-dash/reports/arrival-report/index";
import DepartureReport from "../components/admin-dash/reports/departure-report/index";
import DepartureResult from "../components/admin-dash/reports/departure-report/search";
import SearchFlightReport from "../components/admin-dash/reports/search-by-flight/index";
import SearchFlightResult from "../components/admin-dash/reports/search-by-flight/search";
import ActiveHotelList from "../components/admin-dash/reports/hotel-report/index";
import ActiveCarList from "../components/admin-dash/reports/car-report/index";
import ReportList from "../components/admin-dash/reports/index";
import UserAuditLogs from "../components/admin-dash/manage-users/audit-logs";
import BillingAuditLogs from "../components/admin-dash/accounts-billing/audit-logs";
import TravelersByActiveAlertReport from "../components/admin-dash/reports/travelers-by-active-alert/index"
import ViewTravelersByActiveAlertReport from "../components/admin-dash/reports/travelers-by-active-alert/view"
// import OrganizationAuditLogs from "../components/admin-dash/organizations/audit-logs";
import ProductAuditLogs from "../components/admin-dash/manage-products/audit-logs";
import ManageTravelers from "../components/admin-dash/manage-travelers";
import ViewTraveler from "../components/admin-dash/manage-travelers/view-travelers";
import NotFound from "../components/common/404.jsx";
const routes = [
  {
    path: "",
    component: UserHome
  },
  {
      path: "covid",
      component: UserCovid
  },
  {
    path: "my-profile",
    component: UserProfile
  },
  {
    path: "my-profile/change-password",
    component: UserChangePassword
  },
  {
    path: "invoice",
    component: UserInvoice
  },
  {
    path: "countries",
    component: Countries
  },
  {
    path: "countries/:id",
    component: CountriesInfo
  },
  {
    path: "order-history",
    component: UserHistory
  },
  {
    path: "manage-itinerary/list/:orgid/:id",
    component: UpdateItinerary
  },
  {
    path: "interest",
    component: AreaInterest
  },
  {
    path: "orders",
    component: Orders
  },
  {
    path: "orders/:id",
    component: ViewOrder
  },
  {
    path: "organizations",
    component: Organizations
  },
  {
    path: "organizations/edit/:id",
    component: EditOrganization
  },
  {
    path: "organizations/edit/:id/employees",
    component: EditOrganizationEmployees
  },
  {
    path: "organizations/edit/:orgid/employees/:id",
    component: EditOrganizationEmployee
  },
  {
    path: "organizations/edit/:id/license",
    component: OrganizationLicenseList
  },
  {
    path: "organizations/edit/:orgid/license/:id",
    component: EditOrganizationLicense
  },
  {
    path: "organizations/:id/order-history",
    component: OrganizationOrderHistory
  },
  {
    path: "organizations/:orgid/order-history/:id",
    component: ViewOrganizationOrder
  },
  {
    path: "manage-itinerary/edit/:orgid/:divid/:id",
    component: EditManualItinerary
  },
  /*{
    path: "manage-manual-itinerary/edit/:orgid/:divid/:id",
    component: EditItinerary
  },*/
  // {
  //   path: "geofencing",
  //   component: GeoFencingList
  // },
  // {
  //   path: "geofencing/:id",
  //   component: Maps
  // },
  {
    path: "geofencing/find/org/:pathKey/",
    component: ReloadId
  },
  {
    path: "geofencing/:orgid/",
    component: GeoFencingList
  },
  {
    path: "geofencing/:orgid/:id/",
    component: Maps
  },
  {
    path: "asset-tracking/find/org/:pathKey/",
    component: ReloadId
  },
  {
    path: "asset-tracking/:orgid/",
    component: AssetTracking
  },
  {
    path: "asset-tracking/:orgid/:id/",
    component: AreaInterest
  },
  {
    path: "organizations/:id/divisions/",
    component: ListDivisonOrganization
  },
  {
    path: "organizations/find/:pathKey/",
    component: ReloadId
  },
  {
    path: "organizations/:orgid/divisions/:id/edit/",
    component: EditDivisonOrganization
  },
  {
    path: "organizations/:orgid/divisions/:id/employees/",
    component: EditOrganizationEmployees
  },
  {
    path: "organizations/:orgid/divisions/:id/order-history/",
    component: OrganizationOrderHistory
  },
  /* {
    path: "organizations/:orgid/divisions/:id/invoices/",
    component: AccountsBilling
  }, */
  // {
  //   path: "organizations/:orgid/divisions/:id/logs/",
  //   component: OrganizationAuditLogs
  // },
  {
    path: "organizations/:id/divisions/add/",
    component: AddDivisonOrganization
  },
  {
    path: "organizations/:orgid/divisions/:divid/employees/:id",
    component: EditOrganizationEmployee
  },
  {
    path: "traveller-itineray-details",
    component: TravellerItinerayMapComponent
  },
  {
    path: "custom-alert",
    component: CustomAlertList
  },
  {
    path: "custom-alert/add",
    component: CustomAlert
  },
  {
    path: "custom-alert/view/:id",
    component: CustomAlertView
  },
  {
    path: "accounts-billing",
    component: AccountBilling
  },
  {
    path: "accounts-billing/:id",
    component: AccountBilling
  },
  {
    path: "accounts-billing/organization-invoice/:id",
    component: OrganizationInvoice
  },
  
  {
    path: "traveler-itinerary-viewer/:pnrId/:email",
    component: TravelerItineraryViewer
  },
  {
    path: "traveler-manualitinerary-viewer/:pnrId",
    component: TravelerManualItineraryViewer
  },
  {
    path: "notifications",
    component: Notifications
  },
  {
    path: "notifications/:id",
    component: ViewNotification
  },
  {
    path: "organizations/:id/divisions/:divid/invoices/",
    component: AccountBilling
  },
  {
    path: "reports/active-traveler-list",
    component: ActiveTravelerList
  },
  {
    path: "reports/Where-are-my-travelers",
    component: WhereareTravelers
  },
  {
    path: "reports/Where-are-my-travelers/search",
    component: WhereareTravelersResult
  },
  {
    path: "reports/travelers-by-dest-date",
    component: TravelersbyDestDate
  },
  {
    path: "reports/travelers-by-dest-date/search",
    component: TravelersbyDestDatersResult
  },
  {
    path: "reports/travelers-by-risk-level",
    component: TravelersRiskLevel
  },
  {
    path: "reports/employees-on-the-same-flight",
    component: EmployeesonthesameFlight
  },
  {
    path: "reports/domestic-international",
    component: DomesticInternational
  },
  {
    path: "reports/domestic-international/search",
    component: DomesticInternationalResult
  },
  {
    path: "reports/segment-analysis-report",
    component: SegmentAnalysis
  },
  {
    path: "reports/airport-report",
    component: AirportReport
  },
  {
    path: "reports/airport-report/search",
    component: AirportResult
  },
  {
    path: "reports/arrival-report",
    component: ArrivalReport
  },
  {
    path: "reports/arrival-report/search",
    component: ArrivalResult
  },
  {
    path: "reports/departure-report",
    component: DepartureReport
  },
  {
    path: "reports/departure-report/search",
    component: DepartureResult
  },
  {
    path: "reports/search-by-flight",
    component: SearchFlightReport
  },
  {
    path: "reports/search-by-flight/search",
    component: SearchFlightResult
  },
  {
    path: "reports/active-hotel",
    component: ActiveHotelList
  },
  {
    path: "reports/active-car-report",
    component: ActiveCarList
  },
  {
    path: "reports/travelers-by-active-alert",
    component: TravelersByActiveAlertReport
  },
  {
    path: "reports/travelers-by-active-alert/view/:startDate/:endDate/:id",
    component: ViewTravelersByActiveAlertReport
  },
  
  {
    path: "reports/",
    component: ReportList
  },
  {
    path: "products/product-logs/:id",
    component: ProductAuditLogs
  },
  {
    path: "organizations/organization-logs/:id",
    component: OrganizationAuditLogs
  },
  {
    path: "accounts-billing/audit-logs/:id",
    component: BillingAuditLogs
  },
  {
    path: "user/audit-logs/:id",
    component: UserAuditLogs
  },
  {
    path: "manage-itinerary/find/:pathKey",
    component: ReloadId
  },
  {
    path: "travelers",
    component: ManageTravelers
  },
  {
    path: "travelers/:id",
    component: ViewTraveler
  },
  {
    path: "purchase/:pathKey",
    component: ReloadId
  },
  {
    path: "organizations/:orgid/divisions/:divid/organization-invoice/:id",
    component: OrganizationInvoice
  },
  {
    path: "organizations/:orgid/divisions/:divid/order-history/:id",
    component: ViewOrganizationOrder
  },
  {
    path: "organizations/:id/divisions/:divid/license/",
    component: OrganizationLicenseList
  },
  {
    path: "organizations/:orgid/divisions/:divid/license/:id/",
    component: EditOrganizationLicense
  },
  {
    path: "accounts-billing/find/:pathKey",
    component: ReloadId
  },
  {
    path: "",
    component: NotFound,
    exact: false
  }
];

class UserRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <div style={style}>
        <Switch>
          {routes.map(singleRoute => {
            const { path, exact, ...otherProps } = singleRoute;
            return (
              <Route
                exact={exact === false ? false : true}
                key={singleRoute.path}
                path={`${url}/${singleRoute.path}`}
                {...otherProps}
              />
            );
          })}
        </Switch>
      </div>
    );
  }
}

export default UserRouter;
