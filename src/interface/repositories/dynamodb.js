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

  async getById(id) {
    logger.debug(`getById ${this.tableName} input ${id}`);

    const result = await this.docClient.get({
      ...this.params,
      Key: { id },
    }).promise();

    logger.debug(`getById ${this.tableName} input ${id}`);
    return result;
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
