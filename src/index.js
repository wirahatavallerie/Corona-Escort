import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Corona/Home'
import Global from './Corona/Global'
import Checked from './Corona/Checked'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './Corona/Register';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Checked>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/global" component={Global} />
            </Switch>
          </Checked>
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
