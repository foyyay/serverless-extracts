import * as Data from './data';
import * as DynamoDB from './dynamodb';
import * as Errors from './error';
import * as Lib from './lib';

export * from './data';
export * from './dynamodb';
export * from './error';
export * from './lib';

const All = {
  ...Data,
  ...DynamoDB,
  ...Errors,
  ...Lib,
};

export default All;
