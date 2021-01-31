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
    const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!password.match(regEx)) {
      errors.password =
        'Password must contain at least 8 characters, 1 uppper case letter and a number';
    } else {
      if (password !== confirmPassword) {
        errors.password = 'Confirmation password did not match';
      }
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

module.exports.validateLoginInput = (email, password) => {
  const errors = {};

  //Validate email
  if (email.trim() === '') {
    errors.username = 'Email must not be empty';
  } else {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regEx)) {
      errors.email = 'Email address is invalid';
    }
  }

  //Validate password
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
