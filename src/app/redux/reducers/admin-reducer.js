import { Types } from "../constants/admin-types";
const initialState = {
  countries: [],
  emergencyContacts: {
    // IN: '98989898980',
    // AU: '61000000'
  }
};
export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case Types.COUNTRIES_LIST:
      return {
        ...state,
        countries: action.payload
      };
    case Types.LOAD_EMERGENCY_CONTACTS:
      return {
        ...state,
        emergencyContacts: action.payload
      };
    default:
      return state;
  }
}
