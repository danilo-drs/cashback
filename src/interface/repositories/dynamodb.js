const { v4: uuidv4 } = require('uuid');

const AWS = require('aws-sdk');

// AWS.config.update({
//   region: 'us-est-1',
//   endpoint: 'http://localhost:8000',
// });

const docClient = new AWS.DynamoDB.DocumentClient();

const BaseRepository = require('./base-repository');

module.exports = class DynamoRepository extends BaseRepository {
  get() {
    return this.tableName;
  }

  getById() {
    return this.tableName;
  }

  save(item) {
    console.log(this.tableName);

    return docClient.put({
      ...this.params,
      Item: { ...item, AgentId: uuidv4() },
    }).promise();
  }

  saveMany() {
    return this.tableName;
  }
};
