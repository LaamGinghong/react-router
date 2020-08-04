import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";

export interface RouteOptions {
  history: {
    push(url: string, state?: any, title?: string): void;
    replace(url: string, state?: any, title?: string): void;
    go: typeof window.history.go;
    goBack: typeof window.history.back;
    goForward: typeof window.history.forward;
    length: number;
  };
  url: string;
}

export const RouteContext = createContext<RouteOptions>(null as any);

const BrowserRouter: FC = ({ children }) => {
  const [url, setUrl] = useState(window.location.pathname);

  useEffect(() => {
    window.addEventListener("popstate", handleListenRoute);

    return function () {
      window.removeEventListener("popstate", handleListenRoute);
    };
  }, []);

  const handleListenRoute = useCallback(function () {
    setUrl(window.location.pathname);
  }, []);

  const router: RouteOptions = {
    history: {
      push(url: string, state: any, title: string) {
        window.history.pushState(state, title, url);
        setUrl(url);
      },
      replace(url: string, state: any, title: string) {
        window.history.replaceState(state, title, url);
        setUrl(url);
      },
      go: window.history.go,
      goBack: window.history.back,
      goForward: window.history.forward,
      length: window.history.length,
    },
    url,
  };

  return (
    <RouteContext.Provider value={router}>{children}</RouteContext.Provider>
  );
};

export default BrowserRouter;
