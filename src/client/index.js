import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import App from './app';

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:3000/graphql',
    credentials: 'same-origin'
  }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});

hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('main')
);
