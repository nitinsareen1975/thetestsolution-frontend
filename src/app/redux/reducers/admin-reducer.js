import { Types } from "../constants/admin-types";
const initialState = {
  countries: []
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
    case Types.GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload
      };
    default:
      return state;
  }
}
