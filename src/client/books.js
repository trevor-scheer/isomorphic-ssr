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
        <div className="Books">
          {data.books.map(book => <p key={book.author}>{book.author}</p>)}
        </div>
      )
    }
  </Query>
);

export default Books;
