// const AWS = require("aws-sdk");
// sls invoke local --function create
// const TODO_TABLE = process.env.TODO_TABLE;
// const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

exports.createTodo = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "testing" }),
  };
};
