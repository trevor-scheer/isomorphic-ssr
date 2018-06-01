import React from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

const books = gql`
  query books {
    books {
      author
      title
    }
  }
`;

const Books = props => (
  <Query query={books}>
    {({data, loading}) =>
      loading ? null : (
        <ul>
          {data.books.map(book => (
            <li key={book.author}>
              <p>{book.author}</p>
            </li>
          ))}
        </ul>
      )
    }
  </Query>
);

export default Books;
