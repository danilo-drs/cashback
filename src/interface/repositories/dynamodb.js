const dynamodb = require('aws-sdk/clients/dynamodb');
const { logger } = require('../../shared/logger');
const BaseRepository = require('./base-repository');

const docClient = new dynamodb.DocumentClient({
  apiVersion: '2012-08-10',
  endpoint: 'http://localhost:8000',
});

module.exports = class DynamoRepository extends BaseRepository {
  constructor(tableName) {
    super(tableName);
    this.docClient = docClient;
  }

  async getById(param) {
    logger.debug(`getById ${this.tableName} input ${JSON.stringify(param)}`);

    const result = await this.docClient.query({
      ...this.params,
      KeyConditionExpression: `#${param.key} = :value`,
      ExpressionAttributeNames: {
        [`#${param.key}`]: param.key,
      },
      ExpressionAttributeValues: {
        ':value': param.value,
      },
    }).promise();

    logger.debug(`getById ${this.tableName} input ${param}`);
    return { items: result.Items, count: result.Count };
  }

  async save(item) {
    logger.debug(`save ${this.tableName} input ${JSON.stringify(item)}`);
    const model = { ...item };
    await this.docClient.put({ ...this.params, Item: model }).promise();
    delete model.password;

    logger.debug(`${this.tableName} data saved: ${JSON.stringify(item)}`);
    return item;
  }

  saveMany() {
    return this.tableName;
  }
};
