import * as Joi from 'joi';
import uuid from 'uuid';
import uuidToHex from 'uuid-to-hex';
import { validateOrThrow } from './shape';

const PREFIX_SCHEMA = Joi.string()
  .min(1)
  .alphanum()
  .required();
const UUID_SCHEMA = Joi.string()
  .guid({ version: ['uuidv4'] })
  .required();
const JOIN_ON = '_';
const KEY_SCHEMA = Joi.string()
  .regex(/[a-zA-Z0-9]+_[0-9a-f]{32}/)
  .required();

export function prefixedKey(prefix) {
  validateOrThrow(prefix, PREFIX_SCHEMA);
  return [prefix, uuidToHex(uuid.v4())].join(JOIN_ON);
}

export function isPrefixedKey(prefix, value) {
  let keyCheck = Joi.validate(value, KEY_SCHEMA);
  if (keyCheck.error) {
    return false;
  }

  let parts = value.split(JOIN_ON);
  if (parts.length != 2) {
    return false;
  }

  if (prefix !== undefined && parts[0] !== prefix) {
    return false;
  }

  let uuidCheck = Joi.validate(parts[1], UUID_SCHEMA);
  if (uuidCheck.error) {
    return false;
  }

  return true;
}

export function prefixOfKey(value) {
  if (!isPrefixedKey(undefined, value)) {
    return undefined;
  }

  return value.split(JOIN_ON)[0];
}

export function prefixedKeyGenerator(prefix) {
  return () => prefixedKey(prefix);
}

export function isPrefixedKeyGenerator(prefix) {
  return value => isPrefixedKey(prefix, value);
}
