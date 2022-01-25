import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserRoles from "../user-roles";
import routeOptions from "./route";

const  PrivateRoute =  ({ component: Component, roles,status,isLoggedIn,urls,currPath,...rest }) => {
    var currentUserTemp = '{"userID":9,"userName":"prashant.sharma","firstName":"priyanka","lastName":"Redblink","email":"prashant.sharma@redblink.net","contactNo":"+919855201328","userType":1,"companyID":1,"role":"Admin","themeId":1,"logo":"","parentOrgId":1,"accountConfirmed":true,"tierId":0,"isActiveMembership":false,"redirect":"/admin/"}';
    localStorage.setItem("user", currentUserTemp);
    localStorage.setItem("tokenData", 'fake-jwt-token');
    const currentUser =JSON.parse(localStorage.getItem("user"));
    let loggedInUserroleURL = "";
    
    if(currentUser)
        loggedInUserroleURL = UserRoles.types[currentUser.role].url;
    else
        loggedInUserroleURL ="/";

   return( <Route {...rest} render={({props }) => {
        if(currentUser){
            if((roles && roles.indexOf(currentUser.role) === -1) || 
            (routeOptions.urls[currPath] && routeOptions.urls[currPath].indexOf(currentUser.role) === -1)) {
                return (<Redirect to={{ pathname: loggedInUserroleURL }} />)
            }else{
                return (<Component {...props} />)
            }
        }else{
            return (<Redirect to={{ pathname: "/login" }} />)
        }
    }} />)
}
export default  PrivateRoute
