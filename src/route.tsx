import React, { ComponentType, FC, useContext } from "react";

import { RouteContext, RouteOptions } from "./browser-router";

interface RouteComponentProps {
  history: RouteOptions["history"];
  match: { path: string; url: string };
}

interface RouteProps {
  component: ComponentType<RouteComponentProps>;
  path: string;
}

const Route: FC<RouteProps> = ({ component: Component, path }) => {
  const { history, url } = useContext(RouteContext);
  const match = {
    path,
    url,
  };

  if (url !== path) return null;

  return <Component history={history} match={match} />;
};

export default Route;
