const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema')

const app = express()

mongoose
  .connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose
  .connection
  .on('error', console.error.bind(console, 'connection error:'))
  .once('open', ()=> console.log('db is connected') );

app.use(cors())
app.use(bodyParser.json());
app.get('/',(req,res)=>res.send('server is running'))

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(4004, ()=> console.log("server is running on port http://localhost:4004") )