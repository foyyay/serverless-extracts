import * as Joi from 'joi';
import { validateOrThrow } from './shape';

export function dateToUnixTimestamp(date) {
  let timestamp = validateOrThrow(date, Joi.date());
  return Math.floor(timestamp.getTime() / 1000);
}
