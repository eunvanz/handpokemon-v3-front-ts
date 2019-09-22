import React, { ReactNode, useContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';

const RouterContext = React.createContext({} as RouteChildrenProps);

export const HookedBrowserRouter = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>
    <Route>
      {routeProps => (
        <RouterContext.Provider value={routeProps}>
          {children}
        </RouterContext.Provider>
      )}
    </Route>
  </BrowserRouter>
);

export const useRouter = () => {
  return useContext(RouterContext);
};
