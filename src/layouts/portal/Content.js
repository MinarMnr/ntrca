// core
import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { portalRoutes } from "../../routes";
import AuthRoute from "../../components/routes/AuthRoute";

const Default = () => {
  return (
    <div className="mt-15">
      <Suspense fallback={<ProgressBar />}>
        <Switch>
          {portalRoutes.map((route, idx) => {
            return (
              route.component && (
                <AuthRoute
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  component={route.component}
                />
              )
            );
          })}
          <Redirect from="/portal" to="/portal/dashboard" />
          <Redirect from="/dashboard" to="/portal/dashboard" />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Default;
