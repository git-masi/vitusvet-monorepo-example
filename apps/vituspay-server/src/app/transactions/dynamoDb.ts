import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import {
  Transactions,
  TransactionAmountType,
  TransactionAmount,
} from '@vitusvet/vituspay-types';
import { getCredentials } from '../utils/awsCredentials';

const TableName = 'VitusPay-Resources_Transactions_dev';

export function initDynamoDbRepository() {
  // =============
  // Refactor Note
  // =============
  // The region should be dynamic in the future
  const dbClient = new DynamoDBClient({
    region: 'us-east-1',
    credentials: getCredentials(process.env.AWS_PROFILE),
  });
  const documentClient = DynamoDBDocumentClient.from(dbClient);

  return {
    getTransactions: getTransactions(documentClient),
    createTransaction: createTransaction(documentClient),
  };
}

function getTransactions(client: DynamoDBDocumentClient) {
  return async () => {
    const { Items } = await client.send(
      new ScanCommand({ TableName, Limit: 3 })
    );

    return Transactions.parse(Items);
  };
}

function createTransaction(client: DynamoDBDocumentClient) {
  // This function doesn't do anything with DynamoDb.
  // It's only here to show how creating a sum type `TransactionsRepository` works
  return async (amount: TransactionAmountType) => {
    if (client && TransactionAmount.parse(amount)) {
      return '26bb301a-fb3d-4a70-84c2-fdb6a8ee59ab';
    } else {
      throw new Error('Could not create the transaction');
    }
  };
}
