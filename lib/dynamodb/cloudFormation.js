"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modelToDynamoDBCloudFormationString = modelToDynamoDBCloudFormationString;

var _yaml = _interopRequireDefault(require("yaml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function modelToDynamoDBCloudFormationString(model) {
  _yaml.default.stringify(resourcify(model));
}

function resourcify(model) {
  var _outputs;

  var requirements = model.getTableReq();
  var tableName = requirements.TableName;
  var namePrefix = '${self:service}-${self:provider.stage}-';
  var fullTableName = "".concat(tableName, "Table");
  var arnName = "".concat(fullTableName, "Arn");
  var nameName = "".concat(fullTableName, "Name");
  var outputs = (_outputs = {}, _defineProperty(_outputs, arnName, {
    Description: "The ARN for the ".concat(tableName, " table"),
    Value: {
      'Fn::GetAtt': [fullTableName, 'Arn']
    },
    Export: {
      Name: "".concat(namePrefix).concat(arnName)
    }
  }), _defineProperty(_outputs, nameName, {
    Description: "The name of the ".concat(tableName, " table"),
    Value: {
      Ref: fullTableName
    },
    Export: {
      Name: "".concat(namePrefix).concat(nameName)
    }
  }), _outputs);
  var properties = {};
  properties['TableName'] = "".concat(namePrefix).concat(tableName);
  properties['BillingMode'] = 'PAY_PER_REQUEST';
  properties['SSESpecification'] = {
    SSEEnabled: true
  };
  properties['PointInTimeRecoverySpecification'] = {
    PointInTimeRecoveryEnabled: true
  };
  properties['AttributeDefinitions'] = requirements['AttributeDefinitions'];
  properties['KeySchema'] = requirements['KeySchema'];

  if (requirements['GlobalSecondaryIndexes'] !== undefined) {
    properties['GlobalSecondaryIndexes'] = requirements['GlobalSecondaryIndexes'].map(function (globalIndex) {
      return {
        IndexName: globalIndex.IndexName,
        Projection: globalIndex.Projection,
        KeySchema: globalIndex.KeySchema
      };
    });
  }

  return {
    Resources: _defineProperty({}, fullTableName, {
      Type: 'AWS::DynamoDB::Table',
      Properties: properties
    }),
    Outputs: outputs
  };
}