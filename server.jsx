import casual from 'casual';
import express from 'express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'graphql-server-express';
import typeDefs from './mySchema';

const PORT = 4000;
const ADDRESS = "192.168.2.5"

const schema = makeExecutableSchema({ typeDefs });
const mocks = {
  User: () => ({
     id: casual.uuid,
     name: casual.username,
  }),
  Card: () => ({
     id: casual.uuid,
     title: casual.title
 })
};

addMockFunctionsToSchema({ schema, mocks });

var app = express();

// bodyParser is needed just for POST.
app.use('/graphql', (req, res, next) => {
   console.log("salut");
   res.setHeader('Access-Control-Allow-Origin', 'http://192.168.2.5:3000');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.setHeader('Access-Control-Allow-Credentials', true);
   if (req.method === 'OPTIONS') {
    res.sendStatus(200);
   } else {
    next();
   }
   // next();
}, bodyParser.json(), graphqlExpress({ schema: schema }));

app.listen(PORT, ADDRESS, () => {
   console.log("server started");
});
