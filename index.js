const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "CounterDB";
const KEY = {
    id: "HelloCounter"
};

exports.handler = async (event) => {
    try {
        var response = await ddb.update({
            TableName: TABLE_NAME,
            Key: KEY,
            UpdateExpression: "set #c = #c + :o",
            ExpressionAttributeNames: {"#c": "count"},
            ExpressionAttributeValues: {":o": 1},
            ReturnValues: "UPDATED_NEW"
        }).promise();
        var c = response.Attributes.count;
        return {message: "Hello World!", count: c};
    } catch(e) {
        await ddb.put({
            TableName: TABLE_NAME,
            Item: {
                id: "HelloCounter",
                count: 1
            }
        }).promise();
        return {message: "Hello World!", count: 1};
    }
};

