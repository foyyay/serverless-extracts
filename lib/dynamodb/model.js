"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineModel = defineModel;
exports.defineValidatedPrefixKey = defineValidatedPrefixKey;
exports.defineDefaultedPrefixedKey = defineDefaultedPrefixedKey;
exports.defineEnum = defineEnum;

var _dynamoose = _interopRequireDefault(require("dynamoose"));

var _key = require("../data/key");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultModelOptions = {
  create: true,
  update: false,
  waitForActive: true,
  waitForActiveTimeout: 5 * 1000
};
var defaultSchemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_up'
  }
};

function defineModel(tableName, modelName, schemaParams, options) {
  var schemaOptions = schemaParams.options || {};
  var modelOptions = options || {};
  var schema = new _dynamoose.default.Schema(schemaParams.attributes, _objectSpread({}, defaultSchemaOptions, schemaOptions));
  schema.statics = schemaParams.statics || {};
  schema.methods = schemaParams.methods || {};

  var model = _dynamoose.default.model(tableName, schema, _objectSpread({}, defaultModelOptions, modelOptions));

  Object.defineProperty(model, 'modelName', {
    value: modelName
  });
  return model;
}

function defineValidatedPrefixKey(prefix) {
  return {
    type: String,
    validate: (0, _key.isPrefixedKeyGenerator)(prefix)
  };
}

function defineDefaultedPrefixedKey(prefix) {
  return _objectSpread({
    type: String,
    default: (0, _key.prefixedKeyGenerator)(prefix)
  }, defineValidatedPrefixKey(prefix));
}

function defineEnum(values) {
  return {
    type: String,
    enum: values
  };
}