import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Login from "../Authentication/Login/Login";
// import Register from "../Authentication/Register/Register";
import Navbar from "../Navbar/Navbar";
// import Dashboard from "../Dashboard/Dashboard";
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
          </React.Suspense>
        </Switch>
      </Router>
    </div>
  );
};

export default Body;
