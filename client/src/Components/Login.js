import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      dateOfBirth
      prizePoints
      attempts
      voucher {
        voucherID
        value
      }
      isActive
      token
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('ann@email.com');
  const [password, setPassword] = useState('1234');

  const [login, { data }] = useMutation(LOGIN);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({
            variables: {
              email,
              password,
            },
          });
          console.log(data);
          // .then(console.log(data))
          // .catch((err) => {
          //   console.log(err);
          // });
        }}
      >
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

// const Login = () => {
//   const [login, { dataMutation }] = useMutation(LOGIN, {
//     variables: {
//       email: 'ann@email.com',
//       password: '1234',
//     },
//   });
//   console.log(dataMutation);
//   return <p>{login}</p>;
// };

export default Login;
