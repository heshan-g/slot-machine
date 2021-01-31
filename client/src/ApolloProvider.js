import React from 'react';
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  createHttpLink,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

import App from './Components/App';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        merge: false,
        // fields: {
        //   id: { merge: false },
        //   email: { merge: false },
        //   password: { merge: false },
        //   dateOfBirth: { merge: false },
        //   prizePoints: { merge: false },
        //   attempts: { merge: false },
        //   vouchers: { merge: false },
        //   isActive: { merge: false },
        //   token: { merge: false },
        // },
      },
    },
  }),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
