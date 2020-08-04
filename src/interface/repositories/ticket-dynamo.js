const DynamoRepository = require('./dynamodb');

// repository used to abstract dynomodb complexity to query from nom key values
module.exports = class TicketDynamoRepository extends DynamoRepository {
  async get(params) {
    const query = {
      TableName: this.tableName,
      IndexName: 'byCpf',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': params.email,
      },
    };
    const result = this.docClient.query(query).promise();
    return result;
  }
};
