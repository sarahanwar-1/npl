const checkUrlValidity = (url) => {
  const urlPattern = new RegExp(
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/
  );
  return urlPattern.test(url);
};

export { checkUrlValidity };
