import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import Login from './Login';

function App() {
  return (
    <div>
      <h1>Slot-Machine</h1>
      <Login />
    </div>
  );
}

export default App;
