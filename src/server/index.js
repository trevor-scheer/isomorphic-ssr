import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {schema} from '../data/mockgql';
import renderer from './renderer';

const app = new express();

app.use(express.static('dist'));

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.get('*', (req, res) => {
  renderer({req}).then(({context, html}) => {
    if (context.url) {
      res.redirect(302, context.url);
      res.end();
    } else {
      res.status(200);
      res.send(html);
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
