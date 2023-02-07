import { Router, RequestHandler } from 'express';
import { ZodError } from 'zod';
import {
  TransactionAmount,
  TransactionAmountType,
  TransactionIdType,
  TransactionType,
} from '@vitusvet/vituspay-types';

interface GetTransactionsActions {
  getTransactions: () => Promise<Array<TransactionType>>;
}

interface CreateTransactionActions {
  createTransaction: (
    amount: TransactionAmountType
  ) => Promise<TransactionIdType>;
}

// The `TransactionsRepository` is a collection of actions required to init all
// of the route handlers. Actions are just a collection of functionality required
// to do some useful work like updating a database.
// It is a sum type like `SomeActions & SomeOtherActions` and can be extended
// with more types as needed.
type TransactionsRepository = GetTransactionsActions & CreateTransactionActions;

export function initTransactionsRouter(repository: TransactionsRepository) {
  const transactionsRouter = Router();

  transactionsRouter.get('/', getTransactions(repository));
  transactionsRouter.post('/', createTransaction(repository));

  return transactionsRouter;
}

function getTransactions(actions: GetTransactionsActions): RequestHandler {
  return async (req, res) => {
    try {
      res.send(await actions.getTransactions());
    } catch (error) {
      console.error(error);

      res.sendStatus(500);
    }
  };
}

function createTransaction(actions: CreateTransactionActions): RequestHandler {
  return async (req, res) => {
    try {
      const amount = TransactionAmount.parse(req.body.amount);

      const id = await actions.createTransaction(amount);

      res.status(201).send({ id });
    } catch (error) {
      console.error(error);

      if (error instanceof ZodError) {
        res.sendStatus(400);
        return;
      }

      res.sendStatus(500);
    }
  };
}
