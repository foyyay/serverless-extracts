import * as Joi from 'joi';

export function validateOrThrow(value, schema, options) {
  let validated = Joi.validate(value, schema, options);
  if (validated.error) {
    throw validated.error;
  }
  return validated.value;
}
