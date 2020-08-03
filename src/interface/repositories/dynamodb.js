const { v4: uuidv4 } = require('uuid');
const dynamodb = require('aws-sdk/clients/dynamodb');
const { logger } = require('../../shared/logger');
const BaseRepository = require('./base-repository');

const docClient = new dynamodb.DocumentClient({
  apiVersion: '2012-08-10',
  endpoint: 'http://localhost:8000',
});

module.exports = class DynamoRepository extends BaseRepository {
  async getById(id) {
    logger.debug(`getById ${this.tableName} input ${id}`);

    const result = await docClient.get({
      ...this.params,
      Key: { id },
    }).promise();

    logger.debug(`getById ${this.tableName} input ${id}`);
    return result;
  }

  async save(item) {
    logger.debug(`save ${this.tableName} input ${JSON.stringify(item)}`);

    const resselerId = item.ResselerId || uuidv4();
    const model = { ...item, ResselerId: resselerId };

    logger.debug(`${this.tableName} data saved: ${JSON.stringify(model)}`);
    delete model.password;
    await docClient.put({
      ...this.params,
      Item: model,
    }).promise();

    return model;
  }

  saveMany() {
    return this.tableName;
  }
};
