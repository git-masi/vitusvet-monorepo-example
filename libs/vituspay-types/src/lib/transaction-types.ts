import { z } from 'zod';

export const TransactionId = z.string().uuid();

export type TransactionIdType = z.infer<typeof TransactionId>;

export const TransactionAmount = z.number().int().min(1);

export type TransactionAmountType = z.infer<typeof TransactionAmount>;

export const TransactionStatus = z.enum([
  'link sent',
  'draft',
  'succeeded',
  'sending link',
]);

export const Transaction = z.object({
  pk: TransactionId,
  sort: z.string(),
  charge: z.object({
    amount: TransactionAmount,
    applicationFee: z.number().int().min(0),
    applicationFeeAmount: z.number().int().min(0),
    card: z.object({
      brand: z.string(),
      holderFullName: z.string(),
      last4: z.number().int(),
    }),
    // =============
    // Refactor Note
    // =============
    // Zod has support for dates but it is not clear how to enforce a timestamp
    // Using number until a better solution is found
    created: z.number().int(),
  }),
  status: TransactionStatus,
});

export type TransactionType = z.infer<typeof Transaction>;

export const Transactions = z.array(Transaction);

export type TransactionsType = z.infer<typeof Transactions>;
