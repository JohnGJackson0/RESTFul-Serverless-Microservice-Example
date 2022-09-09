const AWS = require("aws-sdk");
const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

/*
  Example:
  curl --location --request GET 'https://3quh2ijg3e.execute-api.us-east-1.amazonaws.com/dev/todos/39d68d20-2ed4-11ed-925a-e9834c4d158a'
*/

module.exports.deleteTodo = (event, context, callback) => {
  const params = {
    TableName: TODO_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDbClient.delete(params, (error, data) => {
    if (error) {
      console.error(error);
      callback(new Error(error));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify({ data: "Deletion Successful!" }),
    };
    callback(null, response);
  });
};
