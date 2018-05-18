import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

const users = gql`
  query users {
    users {
      id
      name
    }
  }
`;

const Users = props => (
  <Query query={users}>
    {({data, loading}) =>
      loading ? null : (
        <dl className="Users">
          {data.users.map(user => (
            <Fragment key={user.id}>
              <dt key={user.id}>{user.id}</dt>
              <dd>{user.name}</dd>
            </Fragment>
          ))}
        </dl>
      )
    }
  </Query>
);

export default Users;
