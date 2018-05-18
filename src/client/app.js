import React from 'react';
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import Books from './books';
import Users from './users';

const App = props => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/test">Books</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Redirect exact from="/" to="/test" />
        <Route path="/test">
          <Books />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
