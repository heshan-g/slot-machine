module.exports.validateRegisterInput = (
  email,
  password,
  confirmPassword,
  dateOfBirth
) => {
  const errors = {};

  //Validate email
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regEx)) {
      errors.email = 'Email address is invalid';
    }
  }

  //Validate password
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  } else {
    if (password !== confirmPassword) {
      errors.password = 'Confirmation password did not match';
    }
  }

  //Validate date of birth
  if (isNaN(Date.parse(dateOfBirth))) {
    errors.dateOfBirth = 'Invalid date of birth';
  }

  //Return errors (if any)
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
