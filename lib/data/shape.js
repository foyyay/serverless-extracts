"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateOrThrow = validateOrThrow;

var Joi = _interopRequireWildcard(require("joi"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function validateOrThrow(value, schema, options) {
  var validated = Joi.validate(value, schema, options);

  if (validated.error) {
    throw validated.error;
  }

  return validated.value;
}