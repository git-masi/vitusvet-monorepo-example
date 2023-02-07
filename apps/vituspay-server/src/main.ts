import bodyParser from 'body-parser';
import express from 'express';
import { authRouter } from './app/auth/auth';
import { initDynamoDbRepository } from './app/transactions/dynamoDb';
import { initTransactionsRouter } from './app/transactions/transactions';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

const transactionsRouter = initTransactionsRouter(initDynamoDbRepository());

app.use(bodyParser.json());

app.use('/auth', authRouter);

app.use('/transactions', transactionsRouter);

app.get('/', (req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`[ ready ] http://localhost:${port}`);
});
