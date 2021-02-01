export const validateRegisterInput = (
  email,
  username,
  password,
  confirmPassword,
) => {
  const errors = {};

  if (username.trim().length !== username.length) {
    errors.username = "Username don't allow leading and trailing spaces";
  } else if (username === '') {
    errors.username = 'Username must not be empty';
  } else if (username.length < 8 || username.length > 16) {
    errors.username = 'Username must be between 8 to 16 characters';
  }

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  if (password.trim().length !== password.length) {
    errors.password = "Password don't allow leading and trailing spaces";
  } else if (password === '') {
    errors.password = 'Password must not be empty';
  } else if (password.length < 6) {
    errors.password = 'Password must be atleast 6 letters long';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Password must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateLoginInput = (email, password) => {
  const errors = {};

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
