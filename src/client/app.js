import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Books from './pages/books';
import Users from './pages/users';
import {renderRoutes} from 'react-router-config';
import './App.scss';

const App = props => (
  <Fragment>
    <nav className="App-header">
      <ul>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
    {renderRoutes(props.route.routes)}
  </Fragment>
);

export default App;
