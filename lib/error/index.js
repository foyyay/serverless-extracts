"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _notimplemented = require("./notimplemented");

Object.keys(_notimplemented).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _notimplemented[key];
    }
  });
});