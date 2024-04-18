export const validateUrl = (url) => {
  const regex = /^(https|http):\/\/github\.com\/[\w.-]+?\/[\w.-]+?\/?$/gi;
  return regex.test(url);
};
