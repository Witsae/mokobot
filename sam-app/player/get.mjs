import {DynamoDBClient, GetItemCommand} from '@aws-sdk/client-dynamodb';

export const lambdaHandler = async (event, context) => {
  const docClient = new DynamoDBClient({ region: 'ap-northeast-2' });
  const params = {
    TableName: "playerTable",
    Key: {
      discordID: { S: "1" }
    }
  }
  const getItem = new GetItemCommand(params);

  try {
    const data = await docClient.send(getItem);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

