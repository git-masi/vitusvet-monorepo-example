import { TransactionType } from '@vitusvet/vituspay-types';

export function Transaction({ transaction }: { transaction: TransactionType }) {
  return (
    <div>
      <h2>{transaction.pk}</h2>
      <h3>{transaction.status}</h3>
      <p>amount: {transaction.charge.amount}</p>
      <p>created: {new Date(transaction.charge.created).toISOString()}</p>
    </div>
  );
}
