import Admin from "../components/admin/admin.jsx";
import Login from "../components/login/login.jsx";
import ForgotPassword from "../components/forgot-password/forgot-password.jsx";
import ResetPassword from "../components/reset-password/reset-password.jsx";
import NotFound from "../components/common/404.jsx";
import ServerError from "../components/common/500.jsx";
import Register from "../components/register/register.jsx";
import LabAdmin from "../components/lab-admin/lab-admin.jsx";
import PatientReport from "../components/patient-report/view.jsx";
import GroupPatientReport from "../components/group-patient-report/view.jsx";
import PatientForm from "../components/patient-form/view.jsx";
import PatientReportLogin from "../components/patient-report/index.jsx";
import Success from "../components/register/steps/success.jsx";
import PreRegistrationQrcode from "../components/pre-registration-qrcode/index.jsx";
import EventPreRegister from "../components/event-pre-register/index.jsx";
export default {
  routes: [
    {
      path: "/login",
      component: Login,
      exact: true
    },
    {
      path: "/",
      component: Login,
      exact: true
    },
    {
      path: "/forgot-password",
      component: ForgotPassword,
      exact: true
    },
    {
      path: "/reset-password",
      component: ResetPassword,
      exact: true
    },
    {
      path: "/404",
      component: NotFound,
      exact: true
    },
    ,
    {
      path: "/500",
      component: ServerError,
      exact: true
    },
    {
      path: "/register",
      component: Register,
      exact: true
    },
    {
      path: "/patient-report/:patientId/:code",
      component: PatientReport,
      exact: true
    },
    {
      path: "/print-patient-form/:id",
      component: PatientForm
    },
    {
      path: "/patient-report/:patientId",
      component: PatientReportLogin,
      exact: true
    },
    {
      path: "/thank-you",
      component: Success,
      exact: true
    },
    {
      path: "/group-patient-report/:patientId/:code",
      component: GroupPatientReport,
      exact: true
    },
    {
      path: "/pre-registration-qrcode/:eventId",
      component: PreRegistrationQrcode,
      exact: true
    },
    {
      path: "/event-pre-register/:eventId",
      component: EventPreRegister,
      exact: true
    }
  ],
  private: [
    {
      path: "/admin",
      component: Admin,
      exact: false,
      roles: ["Administrator"],
      status: 200
    },
    {
      path: "/lab",
      component: LabAdmin,
      exact: false,
      roles: ["Lab Admin", "Doctor", "Nurse", "Medical Assistant", "Clerk"],
      status: 200
    }
  ],
  urls: {}
};