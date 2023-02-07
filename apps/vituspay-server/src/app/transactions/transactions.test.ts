import express from 'express';
import { beforeEach, describe, expect, it } from 'vitest';
import { initTransactionsRouter } from './transactions';
import {
  TransactionAmountType,
  TransactionId,
  Transactions,
  TransactionStatus,
} from '@vitusvet/vituspay-types';
import request from 'supertest';
import bodyParser from 'body-parser';

describe('transactions service', () => {
  const app = express();
  app.use(bodyParser.json());
  let repository = initInMemoryRepository();
  const router = initTransactionsRouter(repository);

  app.use(router);

  beforeEach(() => {
    repository = initInMemoryRepository();
  });

  describe('get transactions => GET /', () => {
    it('should return status 200', async () => {
      const res = await request(app).get('/');

      expect(res.statusCode).toBe(200);
    });

    it('should return an array of transactions', async () => {
      const res = await request(app).get('/');

      expect(Transactions.parse(res.body)).toBeTruthy();
    });
  });

  describe('create transaction => POST /', () => {
    it('should return status 201', async () => {
      const res = await request(app).post('/').send({ amount: 42 });

      expect(res.statusCode).toBe(201);
    });

    it('should return a transaction id', async () => {
      const res = await request(app).post('/').send({ amount: 42 });

      expect(TransactionId.parse(res.body.id)).toBeTruthy();
    });
  });
});

function initInMemoryRepository() {
  const now = Date.now();
  const isoDate = new Date(now).toISOString();

  return {
    getTransactions: async () => [
      {
        pk: '26bb301a-fb3d-4a70-84c2-fdb6a8ee59ab',
        sort: `${isoDate}#payfabric#pf_123abcXYZ`,
        charge: {
          amount: 1337,
          applicationFee: 0,
          applicationFeeAmount: 0,
          card: {
            brand: '',
            holderFullName: '',
            last4: 0,
          },
          created: now,
        },
        status: TransactionStatus.Values['sending link'],
      },
    ],
    createTransaction: async (amount: TransactionAmountType) =>
      '26bb301a-fb3d-4a70-84c2-fdb6a8ee59ab',
  };
}
