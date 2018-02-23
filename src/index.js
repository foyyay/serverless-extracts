import uuid from 'uuid';
import uuidToHex from 'uuid-to-hex';

function uuidV4Hex() {
  return uuidToHex(uuid.v4());
}

export function prefixedKey(prefix, join = '_', generator = uuidV4Hex) {
  let key = generator();

  if (prefix === undefined) {
    return key;
  }

  return [prefix, key].join(join);
}

export function validEmail(address) {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return re.test(address);
}
