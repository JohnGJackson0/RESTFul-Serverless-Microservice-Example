const AWS = require("aws-sdk");
const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

/*
  Example:
  curl --location --request PUT 'https://3quh2ijg3e.execute-api.us-east-1.amazonaws.com/dev/todos/3c9dea80-2ed4-11ed-925a-e9834c4d158a' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "checked": true,
      "todo": "Test" 
  }'
*/

module.exports.updateTodo = (event, context, callback) => {
  const datetime = new Date().getTime();
  const data = JSON.parse(event.body);

  if (typeof data.todo !== "string" || typeof data.checked !== "boolean") {
    console.error("Validation failed");
    return;
  }

  const params = {
    TableName: TODO_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      "#todo_text": "todo",
    },
    ExpressionAttributeValues: {
      ":todo": data.todo,
      ":checked": data.checked,
      ":updatedAt": datetime,
    },
    UpdateExpression:
      "SET #todo_text = :todo, checked = :checked, updatedAt = :updatedAt",
    ReturnValues: "ALL_NEW",
  };

  dynamoDbClient.update(params, (error, data) => {
    if (error) {
      console.error(error);
      callback(new Error(error));
      return;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Attributes),
    };
    callback(null, response);
  });
};
