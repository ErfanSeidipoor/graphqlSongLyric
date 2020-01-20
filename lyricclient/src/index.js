import React from 'react';
import ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from "react-apollo";
import { HttpLink } from 'apollo-link-http';
import { Router, Route, Switch } from "react-router";
import history from "./history"; 

import SongList from './components/songList';
import AddSong from './components/addSong';
import SongDetail from './components/songDetail';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4004/graphql'
  }),
  cache:  new InMemoryCache({
    dataIdFromObject: object => object.id
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <Switch>
        <Route path="/songs/add" exact component={AddSong} />
        <Route path="/songs/:id" exact component={SongDetail} />
        <Route path="/" component={SongList} />
      </Switch>
    </Router>
  </ApolloProvider>
, document.getElementById('root'));
