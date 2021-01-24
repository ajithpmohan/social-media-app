export default (body) => {
  const errors = {};
  if (body.trim() === '') {
    errors.body = 'Body must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
