import {DynamoDBClient, PutItemCommand} from '@aws-sdk/client-dynamodb';

export const lambdaHandler = async (event, context) => {
  const docClient = new DynamoDBClient({ region: 'ap-northeast-2' });
  const params = {
    TableName: "playerTable",
    Item: {
      discordID: { S: "1" },
      chaID: { S: "asdf" },
      chaLvl: { N: "1500" }
    }
  };
  const putItem = new PutItemCommand(params);

  try {
    const data = await docClient.send(putItem);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};