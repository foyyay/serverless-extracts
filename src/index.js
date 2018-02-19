import uuid from 'uuid';
import uuidToHex from 'uuid-to-hex';

export function prefixedKey(prefix, join = '_', generator = uuidV4Hex) {
  let key = generator();

  if (prefix === undefined) {
    return key;
  }

  return [prefix, key].join(join);
}

function uuidV4Hex() {
  return uuidToHex(uud.v4());
}
