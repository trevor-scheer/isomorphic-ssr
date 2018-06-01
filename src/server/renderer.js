import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router';
import {ApolloProvider, getDataFromTree} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {SchemaLink} from 'apollo-link-schema';
import {matchRoutes, renderRoutes} from 'react-router-config';
import serialize from 'serialize-javascript';
import routes from '../client/routes';
import {schema} from '../data/mockgql';
import App from '../client/App';

export default function renderer({req}) {
  let context = {};

  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({schema}),
    cache: new InMemoryCache()
  });

  //const matched = matchRoutes(routes, req.url);

  const ServerSideApp = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(routes)}
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
      <div id="main">${content}</div>
      <script>
        window.__APOLLO_STATE__=${JSON.stringify(state).replace(
          /</g,
          '\\u003c'
        )};
      </script>
      <script src="/client.js"></script>
    </body>
  </html>
`;
