import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import { AuthProvider } from '../context/auth';
import { AuthRoute, NotAuthRoute } from '../util/AuthRoute';

import MenuBar from './MenuBar';
import LandingPage from '../views/LandingPage';
import Game from '../views/Game';
import Login from '../views/Login';
import Register from '../views/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container fluid>
          <MenuBar />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <AuthRoute exact path='/' component={LandingPage} />
          <NotAuthRoute exact path='/game' component={Game} />
          {/* <Route exact path='/game' component={Game} /> */}
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
