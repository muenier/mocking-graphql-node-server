import express from 'express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'graphql-server-express';

import config from './config.json';
import typeDefs from './myschema.graphql';
import mocks from './mocks';

const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema, mocks });

var app = express();

app.use('/graphql', (req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', config.SERVER_ALLOW_ADDRESS);
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.setHeader('Access-Control-Allow-Credentials', true);
   if (req.method === 'OPTIONS') {
      res.sendStatus(200);
   } else {
      next();
   }
}, bodyParser.json(), graphqlExpress({ schema: schema }));

app.listen(config.SERVER_PORT, config.SERVER_ADDRESS, () => {
   console.log("server started at " + config.SERVER_ADDRESS + ":" + config.SERVER_PORT);
});
