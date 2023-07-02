import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const LazyLogin = React.lazy(() => import("../Authentication/Login/Login"));
const LazyRegister = React.lazy(() =>
  import("../Authentication/Register/Register")
);
const LazyDashboard = React.lazy(() => import("../Dashboard/Dashboard"));
const Body = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <React.Suspense fallback="Loading ...">
            <Route exact path="/" component={LazyLogin} />
            <Route exact path="/register" component={LazyRegister} />
            <Route exact path="/dashboard" component={LazyDashboard} />
            <Route />
          </React.Suspense>
        </Switch>
      </Router>
    </div>
  );
};

export default Body;
