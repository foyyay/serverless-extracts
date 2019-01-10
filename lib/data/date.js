"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateToUnixTimestamp = dateToUnixTimestamp;

var Joi = _interopRequireWildcard(require("joi"));

var _shape = require("./shape");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function dateToUnixTimestamp(date) {
  var timestamp = (0, _shape.validateOrThrow)(date, Joi.date());
  return Math.floor(timestamp.getTime() / 1000);
}