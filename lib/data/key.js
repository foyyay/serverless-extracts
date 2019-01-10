"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefixedKey = prefixedKey;
exports.isPrefixedKey = isPrefixedKey;
exports.prefixedKeyGenerator = prefixedKeyGenerator;
exports.isPrefixedKeyGenerator = isPrefixedKeyGenerator;

var Joi = _interopRequireWildcard(require("joi"));

var _uuid = _interopRequireDefault(require("uuid"));

var _uuidToHex = _interopRequireDefault(require("uuid-to-hex"));

var _shape = require("./shape");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var PREFIX_SCHEMA = Joi.string().min(1).alphanum().required();
var UUID_SCHEMA = Joi.string().guid({
  version: ['uuidv4']
}).required();
var JOIN_ON = '_';
var KEY_SCHEMA = Joi.string().regex(/[a-zA-Z0-9]+_[0-9a-f]{32}/).required();

function prefixedKey(prefix) {
  (0, _shape.validateOrThrow)(prefix, PREFIX_SCHEMA);
  return [prefix, (0, _uuidToHex.default)(_uuid.default.v4())].join(JOIN_ON);
}

function isPrefixedKey(prefix, value) {
  var keyCheck = Joi.validate(value, KEY_SCHEMA);

  if (keyCheck.error) {
    return false;
  }

  var parts = value.split(JOIN_ON);

  if (parts.length != 2) {
    return false;
  }

  if (prefix !== undefined && parts[0] !== prefix) {
    return false;
  }

  var uuidCheck = Joi.validate(parts[1], UUID_SCHEMA);

  if (uuidCheck.error) {
    return false;
  }

  return true;
}

function prefixedKeyGenerator(prefix) {
  return function () {
    return prefixedKey(prefix);
  };
}

function isPrefixedKeyGenerator(prefix) {
  return function (value) {
    return isPrefixedKey(prefix, value);
  };
}