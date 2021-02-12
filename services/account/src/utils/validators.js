export const validateRegisterInput = (
  name,
  email,
  password,
  confirmPassword,
) => {
  const errors = {};

  name = name.trim();
  if (name === '') {
    errors.name = 'Name must not be empty';
  } else if (name.length < 4) {
    errors.name = 'Name must be atleast 4 characters';
  } else if (name.length > 48) {
    errors.name = 'Name must be atmost 48 characters';
  }

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else if (email.length > 32) {
    errors.email = 'Email must be atmost 32 characters';
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
