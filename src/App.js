// -- React and related libs
import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { HashRouter } from "react-router-dom";

// -- Redux
import { connect } from "react-redux";

import { AxiosInterceptor } from './services/axios'
// -- Custom Components
import LayoutComponent from "./components/Layout/Layout";
import ErrorPage from "./pages/error/ErrorPage";
import Login from "./pages/login/Login";

// -- Redux Actions
import { logoutUser } from "./actions/auth";

// -- Third Party Libs
import { ToastContainer } from "react-toastify";

// -- Services
import isAuthenticated from "./services/authService";
// -- Component Styles
import "./styles/app.scss";

const PrivateRoute = ({ dispatch, component, ...rest }) => {
  if (!isAuthenticated(JSON.parse(localStorage.getItem("authenticated")))) {
    dispatch(logoutUser());
    return (<Redirect to="/login" />)
  } else {
    return (
      <Route { ...rest } render={props => (React.createElement(component, props))} />
    );
  }
};

const App = (props) => {
  return (
    <div>

      <ToastContainer/>
      <AxiosInterceptor>
      <HashRouter>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/page/dashboard" />} />
          <Route path="/page" exact render={() => <Redirect to="/page/dashboard"/>}/>
          <PrivateRoute path="/page" dispatch={props.dispatch} component={LayoutComponent} />
          <Route path="/login" exact component={Login} />
          <Route path="/error" exact component={ErrorPage} />
          <Route component={ErrorPage}/>
          <Route path='*' exact={true} render={() => <Redirect to="/error" />} />
        </Switch>
      </HashRouter>
      </AxiosInterceptor>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(App);
