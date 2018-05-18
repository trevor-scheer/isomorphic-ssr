import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../client/app';
import {StaticRouter} from 'react-router';

import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {ApolloProvider, getDataFromTree} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {SchemaLink} from 'apollo-link-schema';

import {schema} from '../data/mockgql';

const app = new express();

app.use(express.static('dist'));

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.get('*', (req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({schema}),
    cache: new InMemoryCache()
  });

  let context = {};

  const ServerSideApp = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );

  const Html = ({content, state}) => (
    <html>
      <body>
        <div id="main" dangerouslySetInnerHTML={{__html: content}} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              '\\u003c'
            )};`
          }}
        />
        <script src="/client.js" />
      </body>
    </html>
  );

  getDataFromTree(ServerSideApp).then(() => {
    const content = ReactDOMServer.renderToString(ServerSideApp);
    const state = client.extract();
    const html = <Html content={content} state={state} />;

    if (context.url) {
      res.redirect(302, context.url);
      res.end();
    } else {
      res.status(200);
      res.send(`<!doctype html>\n${ReactDOMServer.renderToString(html)}`);
      res.end();
    }
  });
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
