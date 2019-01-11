import yaml from 'yaml';

export function modelToDynamoDBCloudFormationString(model) {
  yaml.stringify(resourcify(model));
}

function resourcify(model) {
  let requirements = model.getTableReq();
  let tableName = requirements.TableName;
  let namePrefix = '${self:service}-${self:provider.stage}-';
  let fullTableName = `${tableName}Table`;
  let arnName = `${fullTableName}Arn`;
  let nameName = `${fullTableName}Name`;

  let outputs = {
    [arnName]: {
      Description: `The ARN for the ${tableName} table`,
      Value: {
        'Fn::GetAtt': [fullTableName, 'Arn'],
      },
      Export: {
        Name: `${namePrefix}${arnName}`,
      },
    },
    [nameName]: {
      Description: `The name of the ${tableName} table`,
      Value: {
        Ref: fullTableName,
      },
      Export: {
        Name: `${namePrefix}${nameName}`,
      },
    },
  };

  let properties = {};

  properties['TableName'] = `${namePrefix}${tableName}`;
  properties['BillingMode'] = 'PAY_PER_REQUEST';
  properties['SSESpecification'] = { SSEEnabled: true };
  properties['PointInTimeRecoverySpecification'] = { PointInTimeRecoveryEnabled: true };
  properties['AttributeDefinitions'] = requirements['AttributeDefinitions'];
  properties['KeySchema'] = requirements['KeySchema'];

  if (requirements['GlobalSecondaryIndexes'] !== undefined) {
    properties['GlobalSecondaryIndexes'] = requirements['GlobalSecondaryIndexes'].map(function(
      globalIndex
    ) {
      return {
        IndexName: globalIndex.IndexName,
        Projection: globalIndex.Projection,
        KeySchema: globalIndex.KeySchema,
      };
    });
  }

  return {
    Resources: {
      [fullTableName]: {
        Type: 'AWS::DynamoDB::Table',
        Properties: properties,
      },
    },
    Outputs: outputs,
  };
}
