import React, { useEffect, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.less';
import history from './libs/history';
import store from './stores';
import AppContext from './contexts/AppContext';
import BaseLayout from './layouts/BaseLayout/index';
import { HookedBrowserRouter } from './hooks/useRouter';
import SignIn from './routes/SignIn';
import { SignUp } from './routes';
import SpinContainer from './components/SpinContainer';

history.listen((_, action) => {
  if (action !== 'POP') {
    window.scrollTo(0, 0);
  }
});

export const ROUTES = {
  SIGN_IN: '/sign-in',
};

const App: React.FC = () => {
  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      store.userStore.signInUserWithToken();
    }
  }, []);

  return (
    <AppContext.Provider value={store}>
      <Suspense fallback={<SpinContainer />}>
        <HookedBrowserRouter>
          <BaseLayout>
            <Switch>
              {/* <SpinContainer /> */}
              <Route path='/sign-in' component={SignIn} />
              <Route path='/sign-up' component={SignUp} />
            </Switch>
          </BaseLayout>
        </HookedBrowserRouter>
      </Suspense>
    </AppContext.Provider>
  );
};

export default App;
