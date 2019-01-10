"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = compose;
exports.pipe = pipe;

function compose() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (data) {
    return functions.reduceRight(function (value, func) {
      return func(value);
    }, data);
  };
}

function pipe() {
  for (var _len2 = arguments.length, functions = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    functions[_key2] = arguments[_key2];
  }

  return function (data) {
    return functions.reduce(function (value, func) {
      return func(value);
    }, data);
  };
}