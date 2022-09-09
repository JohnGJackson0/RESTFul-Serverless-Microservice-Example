const AWS = require("aws-sdk");
const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

/*
  Example:
  curl --location --request GET 'https://3quh2ijg3e.execute-api.us-east-1.amazonaws.com/dev/todos'
*/

module.exports.listTodos = (event, context, callback) => {
  const params = {
    TableName: TODO_TABLE,
  };

  dynamoDbClient.scan(params, (error, data) => {
    if (error) {
      console.log(error);
      callback(new Error(error));
      return;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
    callback(null, response);
  });
};
