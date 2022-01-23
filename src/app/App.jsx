import React, { Component } from "react";
import { Switch , withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RouteOptions from "./routes/route";
import PrivateRoute from "./routes/private-routes.jsx";
import { ConfigProvider } from "antd";

class App extends Component {
    componentDidMount(){

    }
  render() {
    let routes = RouteOptions.routes.map(({ path, component, exact }, i) => (
      <Route
        key={Math.random() + "ROUTE_"}
        exact={exact}
        path={path}
        component={component}
      />
    ));
    let privateRoute = RouteOptions.private.map(
      ({ path, component, exact, roles, status }, i) => (
        <PrivateRoute
          key={Math.random() + "REDIRECT_"}
          roles={roles}
          exact={exact}
          path={path}
          component={component}
          status={status}
          currPath={this.props.location.pathname}
        />
      )
    );
    
    return (
      <ConfigProvider>
          <div className="app-container App">
            <Switch>
              {routes}
              {privateRoute}
            </Switch>
          </div>
      </ConfigProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch);
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
  )(App)
);
