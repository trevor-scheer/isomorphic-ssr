import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router';
import {ApolloProvider, getDataFromTree} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {SchemaLink} from 'apollo-link-schema';
import {schema} from '../data/mockgql';
import App from '../client/app';

export default function({req}) {
  let context = {};

  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({schema}),
    cache: new InMemoryCache()
  });

  const ServerSideApp = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );

  return getDataFromTree(ServerSideApp).then(() => {
    const content = ReactDOMServer.renderToString(ServerSideApp);
    const state = client.extract();
    return {
      html: getHydratedMarkup({content, state}),
      context
    };
  });
}

const getHydratedMarkup = ({content, state}) => `
  <!DOCTYPE html>
  <html>
    <body>
      <div id="main">
        ${content}
      </div>
      <script>
        window.__APOLLO_STATE__=${JSON.stringify(state).replace(
          /</g,
          '\\u003c'
        )};
      </script>
      <script src="/client.js" />
    </body>
  </html>
`;
