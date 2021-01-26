import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import MenuBar from './MenuBar';
// import LandingPage from '../views/LandingPage';
// import Game from '../views/Game';
import Login from '../views/Login';
import Register from '../views/Register';

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        {/* <Route exact path='/' component={Home} /> */}
        {/* <Route exact path='/game' component={Game} /> */}
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Container>
    </Router>
  );
}

export default App;
