export function isValidEmail(address) {
  // Do not try to "fix" this regex until you've read and understand this page!!
  // https://www.regular-expressions.info/email.html
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return re.test(address);
}
