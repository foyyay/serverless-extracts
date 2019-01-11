"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  deepFilterNotEmpty: true,
  readable: true
};
exports.deepFilterNotEmpty = deepFilterNotEmpty;
exports.readable = readable;

var _deepFilter = _interopRequireDefault(require("deep-filter"));

var _date = require("./date");

Object.keys(_date).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _date[key];
    }
  });
});

var _email = require("./email");

Object.keys(_email).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _email[key];
    }
  });
});

var _key = require("./key");

Object.keys(_key).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _key[key];
    }
  });
});

var _shape = require("./shape");

Object.keys(_shape).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _shape[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function notEmpty(value) {
  var key;

  if (Array.isArray(value)) {
    return value.length > 0;
  } else if (!!value && _typeof(value) === 'object' && value.constructor === Object) {
    for (key in value) {
      return true;
    }

    return false;
  } else if (typeof value === 'string') {
    return value.length > 0;
  } else {
    return value != null;
  }
}

function deepFilterNotEmpty(data) {
  return (0, _deepFilter.default)(data, notEmpty);
}

function readable(obj) {
  if (typeof obj === 'string') {
    return obj;
  }

  try {
    return JSON.stringify(obj, null, 2);
  } catch (err) {
    return String(obj);
  }
}