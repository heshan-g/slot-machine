import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

export default function Login(props) {
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [login, { loading }] = useMutation(LOGIN, {
    update(_, result) {
      console.log(result);
      props.history.push('/');
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    login();
  };

  return (
    <div>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>

        <Form.Input
          label='Username'
          placeholder='Email'
          name='email'
          type='email'
          value={values.email}
          onChange={onChange}
          error={errors.username ? true : false}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          name='password'
          type='password'
          value={values.password}
          onChange={onChange}
          error={errors.password ? true : false}
        />

        <Button type='submit' primary>
          Login
        </Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      prizePoints
      attempts
      vouchers {
        voucherID
        value
      }
      isActive
      token
    }
  }
`;
