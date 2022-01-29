import {
  Types
} from "../constants/user-types";

import API from "../api/user-api";
import {
  notifyUser
} from "../../services/notification-service"
import UserRoles from "../../user-roles";
import * as UserService from "./../../services/user-service";
import config from "../../config.js"
export function login(username, password) {
  return async function (dispatch, _getState) {
    try {
      let data = {
        email: username,
        password: password
      };
      await API.login(data).then(response => {
        if (response.status && response.status == true) {
          var expiry = new Date();
          expiry.setSeconds(expiry.getSeconds() + response.data.token.expires_in);
          var tokenData = {
            "token_expiry": expiry,
            "token": response.data.token.token,
            "refreshToken": response.data.token.token+'re'
          }
          response.data.user.redirect = UserRoles.types[response.data.user.roles].url;
         
          dispatch({
            type: Types.SAVE_USER,
            payload: response.data
          });
          dispatch({
            type: Types.LOGIN_SUCCESS,
            payload: true
          });
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("tokenData", JSON.stringify(tokenData));
        } else {
          notifyUser("Error logging in. Please try again!", 'error');
        }
      }).catch(e => {
        if (e && e.response && e.response.data) {
          var res = JSON.parse(e.response.data);
          notifyUser(res.message, 'error');
        } else {
          notifyUser('Unknown error!', 'error');
        }
      });
      
    } catch (e) {
      console.log("E", e)
      if (e && e.response && e.response.data && e.response.data.error && e.response.data.error.length > 0) {
        notifyUser(e.response.data.error[0].externalMessage, 'error');
        /* dispatch({
          type: Types.LOGIN_FAIL,
          payload: { errorMessage: e.response.data[0].description, isLoggedIn: false }
        }); */
      } else {
        notifyUser('Unknown error!', 'error');
      }
    }
  };
}

export function getUserData() {
  return async function (dispatch, getState) {
    try {
      let oldUser = JSON.parse(localStorage.getItem('user'))
      dispatch({
        type: Types.LOGIN_SUCCESS,
        payload: oldUser ? true : false
      });
      dispatch({
        type: Types.VALIDATE_USER,
        payload: oldUser
      });
      if (oldUser.logo && oldUser.logo !== "" && oldUser.logo !== null) {
        dispatch({
          type: Types.SAVE_LOGO_URL,
          payload: config.API + '/' + oldUser.logo
        });
      } else {
        dispatch({
          type: Types.SAVE_LOGO_URL,
          payload: ""
        });
      }

    } catch (e) {
      dispatch({
        type: Types.LOGIN_FAIL,
        payload: {
          errorMessage: "Error logging In",
          isLoggedIn: false
        }
      });
    }
  };
}

export function getUserListing({
  filters,
  pagination,
  sorter
}) {
  return async function (dispatch, getState) {
    try {
      let resp = await API.getUserListing({
        filters: filters,
        pagination: pagination,
        sorter: sorter
      });
      return resp;

    } catch (e) {
      /*dispatch({
        type: Types.USER_LISTING_ERROR,
        payload: { errorMessage: "Listing error", isLoggedIn: false }
      });*/
      return {
        "error": true
      };
    }
  };
}


export function addUser(data) {
  return async function (dispatch, getState) {
    return await API.addUser(data);
  }
}

export function updateUser(data) {
  return async function (dispatch, getState) {
    return await API.updateUser(data);
  };
}

export function getUser(idx) {
  return async function (dispatch, getState) {
    return await API.getUser(idx);
  };
}

export function deleteUser(idx) {
  return async function (dispatch, getState) {
    try {
      let resp = await API.deleteUser(idx);

      notifyUser("User Deleted.", 'info');

      return resp;
    } catch (e) {
      /*dispatch({
        type: Types.USER_LISTING_ERROR,
        payload: { errorMessage: "Listing error", isLoggedIn: false }
      })*/
      ;
      return {
        "error": true
      };
    }
  };
}

export function LogOutUser() {
  return async function (dispatch, getState) {
    try {
      localStorage.clear("user");
      localStorage.clear("token");
      UserService.logOut()
      dispatch({
        type: Types.LOG_OUT,
        payload: true
      });
      window.location = window.location.origin;
    } catch (e) {}
  };
}

export function forgotPassword(email) {
  return async function (dispatch, getState) {
    try {
      let data = {
        userName: email
      };
      let response = await API.forgotPassword(data);
      if (response) {
        dispatch({
          type: Types.FORGOT_PASSWORD_RESPONSE,
          payload: response
        });
      } else {
        dispatch({
          type: Types.FORGOT_PASSWORD_RESPONSE,
          payload: {
            flashText: "Error"
          }
        });
      }
    } catch (e) {
      dispatch({
        type: Types.FORGOT_PASSWORD_RESPONSE,
        payload: {
          flashText: "Error"
        }
      });
    }
  };
}

export function checkIfDetailAlreadyVerified(type) {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: Types.SAVE_ALREADY_VERIFIED,
        payload: type
      });
    } catch (e) {}
  };
}

export function getAllRoles({ filters, pagination, sorter }) {
  return async function (dispatch, getState) {
    try {
      let response = await API.getAllRoles({
        filters: filters,
        pagination: pagination,
        sorter: sorter
      });
      return response.data;
    } catch (e) {
      return e;
    }
  };
}

export function getTokenExpiry() {
  return async function (dispatch, getState) {
    try {
      var tokenData = JSON.parse(localStorage.getItem("tokenData"));
      if (tokenData && tokenData.token_expiry && tokenData.token_expiry !== "") {
        var objData = {
          "token_expiry": tokenData.token_expiry,
          "token": tokenData.token,
          "refreshToken": tokenData.refreshToken
        }
        dispatch({
          type: Types.TOKEN_EXPIRY_DATE,
          payload: objData
        });
      } else {
        dispatch({
          type: Types.FLUSH_TOKEN_DATA,
          payload: ""
        });
      }

    } catch (e) {}
  };
}

export function flushTimer() {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: Types.FLUSH_TOKEN_DATA,
        payload: ""
      });
    } catch (e) {}
  };
}

export function updateToken(objToken) {
  return async function (dispatch, getState) {
    try {
      var refreshToken = await API.updateToken(objToken);
      //UserService.updateToken(refreshToken);
      var expiry = new Date();
      expiry.setSeconds(expiry.getSeconds() + refreshToken.accessToken.expiresIn);
      var tokenData = {
        "token_expiry": expiry.toUTCString(),
        "token": refreshToken.accessToken.token,
        "refreshToken": refreshToken.refreshToken
      }
      localStorage.setItem("tokenData", JSON.stringify(tokenData));
      //var tokenExpiryDate = UserService.getTokenByName("token_expiry");
      dispatch({
        type: Types.TOKEN_EXPIRY_DATE,
        payload: tokenData
      });
    } catch (e) {
      dispatch({
        type: Types.FLUSH_TOKEN_DATA,
        payload: ""
      });
    }
  };
}

export function updateProfile(data) {
  return async function (_dispatch, _getState) {
    try {
      return await API.updateProfile(data);
    } catch (e) {
      return {
        "error": true
      };
    }
  };
}

export function myAccount() {
  return async function (_dispatch, _getState) {
    try {
      let resp = await API.getMyAccount();
      return resp;
    } catch (e) {
      return {
        "error": true
      };
    }
  };
}

export function updateMyAccount(data) {
  return async function (_dispatch, _getState) {
    try {
      let resp = await API.updateMyAccount(data);
      return resp;
    } catch (e) {
      return {
        "error": true
      };
    }
  };
}

export function updatePassword(data) {
  return async function (_dispatch, _getState) {
    try {
      let resp = await API.updatePassword(data);
      return resp;
    } catch (e) {
      return {
        "error": true
      };
    }
  };
}

export function updateLoggedInUserAccount(data) {
  return async function (dispatch, _getState) {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    currentUser.firstName = data.firstName;
    currentUser.lastName = data.lastName;
    currentUser.email = data.email;
    currentUser.userName = data.userName;
    currentUser.contactNo = data.contactNo;
    localStorage.setItem('user', JSON.stringify(currentUser));

    dispatch({
      type: Types.UPDATE_MY_ACCOUNT,
      payload: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        contactNo: data.contactNo,
      }
    });
  };
}
export function updateStatus(userId, status) {
  return async function (_dispatch, _getState) {
    try {
      let resp = await API.updateStatus(userId, status);
      return resp;
    } catch (e) {
      return {
        "error": true
      };
    }
  };
}
export function updateContactDetails(data) {
  return async function (_dispatch, _getState) {
    try {
      let resp = await API.updateContactDetails(data);
      return resp;
    } catch (e) {
      return {
        "error": true
      };
    }
  };
}
export function assignIdentity(data) {
  return async function (_dispatch, _getState) {
    try {
      let resp = await API.assignIdentity(data);
      return resp;
    } catch (e) {
      return e;
    }
  };
}

export function getActiveInternalUsers({
  orgId,
  filters,
  pagination,
  sorter
}) {
  return async function (dispatch, getState) {
    try {
      let resp = await API.getActiveInternalUsers({
        orgId: orgId,
        filters: filters,
        pagination: pagination,
        sorter: sorter
      });
      return resp;

    } catch (e) {
      /*dispatch({
        type: Types.USER_LISTING_ERROR,
        payload: { errorMessage: "Listing error", isLoggedIn: false }
      });*/
      return {
        "error": true
      };
    }
  };
}

export function hasB2B2CEmergencyContact(userId) {
  return async function(_dispatch, _getState) {
    try {
      let response = await API.hasB2B2CEmergencyContact(userId);
      return response;
    } catch (e) {
      return { error: true };
    }
  };
}

export function updateB2B2CEmergencyContact(userId, data) {
  return async function(_dispatch, _getState) {
    try {
      let response = await API.updateB2B2CEmergencyContact(userId, data);
      return response;
    } catch (e) {
      return { error: true };
    }
  };
}
