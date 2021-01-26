import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

export default function Register(props) {
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    email: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER, {
    update(_, result) {
      console.log(result);
      props.history.push('/login');
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
    addUser();
  };

  return (
    <div>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>

        <Form.Input
          label='Username'
          placeholder='Email'
          name='email'
          type='email'
          value={values.email}
          onChange={onChange}
          error={errors.email ? true : false}
        />
        <Form.Input
          label='Date of Birth'
          placeholder='DD/MM/YYYY'
          name='dob'
          type='text'
          value={values.dob}
          onChange={onChange}
          error={errors.dateOfBirth ? true : false}
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
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password'
          name='confirmPassword'
          type='password'
          value={values.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword ? true : false}
        />

        <Button type='submit' primary>
          Register
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

const REGISTER = gql`
  mutation register(
    $email: String!
    $password: String!
    $confirmPassword: String!
    $dob: String!
  ) {
    register(
      registerInput: {
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        dateOfBirth: $dob
      }
    ) {
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
