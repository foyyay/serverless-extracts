import dynamoose from 'dynamoose';
import { isPrefixedKeyGenerator, prefixedKeyGenerator } from '../data/key';

if (process.env.DYNAMO_ENDPOINT !== undefined) {
  dynamoose.local(process.env.DYNAMO_ENDPOINT);
}

let defaultModelOptions = {
  create: true,
  update: true,
  waitForActive: true,
  waitForActiveTimeout: 2 * 1000,
};

let defaultSchemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_up',
  },
};

export function defineModel(tableName, modelName, schemaParams, options) {
  let schemaOptions = schemaParams.options || {};
  let modelOptions = options || {};

  let schema = new dynamoose.Schema(schemaParams.attributes, {
    ...defaultSchemaOptions,
    ...schemaOptions,
  });
  schema.statics = schemaParams.statics || {};
  schema.methods = schemaParams.methods || {};

  let model = dynamoose.model(tableName, schema, {
    ...defaultModelOptions,
    ...modelOptions,
  });
  Object.defineProperty(model, 'modelName', { value: modelName });

  return model;
}

export function defineValidatedPrefixKey(prefix) {
  return {
    type: String,
    validate: isPrefixedKeyGenerator(prefix),
  };
}

export function defineDefaultedPrefixedKey(prefix) {
  return {
    type: String,
    default: prefixedKeyGenerator(prefix),
    ...defineValidatedPrefixKey(prefix),
  };
}

export function defineEnum(values) {
  return {
    type: String,
    enum: values,
  };
}

export function defineGlobalIndex(rangeKey) {
  return {
    global: true,
    rangeKey: rangeKey,
    project: false,
  };
}
