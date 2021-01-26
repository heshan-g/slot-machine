import React from 'react';
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  createHttpLink,
} from '@apollo/client';

import App from './Components/App';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
