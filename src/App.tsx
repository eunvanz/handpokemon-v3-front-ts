import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.less';
import history from './libs/history';
import BaseLayout from './layouts/BaseLayout/index';
import { SignUp, SignIn, Collection } from './routes';
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
  return (
    <Suspense fallback={<SpinContainer />}>
      <BrowserRouter>
        <BaseLayout>
          <Switch>
            {/* <SpinContainer /> */}
            <Route path='/sign-in' component={SignIn} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/collection/:id' component={Collection} />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
