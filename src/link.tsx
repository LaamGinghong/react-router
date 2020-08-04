import React, { FC, MouseEvent, useContext } from "react";
import { RouteContext } from "./browser-router";

interface LinkProps {
  to: string;
}

const Link: FC<LinkProps> = ({ to, children }) => {
  const { history } = useContext(RouteContext);

  const handleClick = function (event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    history.push(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Link;
