const AWS = require("aws-sdk");
const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid");

/*
  Example: 

  curl --location --request POST 'https://3quh2ijg3e.execute-api.us-east-1.amazonaws.com/dev/todos' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "todo": "Test"
  }'
*/

module.exports.createTodo = async (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if (typeof data.todo !== "string") {
    console.error("Validation failed");
    return;
  }

  const params = {
    TableName: TODO_TABLE,
    Item: {
      id: uuid.v1(),
      todo: data.todo,
      checked: false,
      createdAt: timestamp,
      upatedAt: timestamp,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
  } catch (e) {
    console.error('error putting into dynamoDB', e);
    callback(new Error('error', e));
    return;
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };

  callback(null, response);
};
