import { TransactionType } from '@vitusvet/vituspay-types';

export function Transaction({ transaction }: { transaction: TransactionType }) {
  return (
    <div
      style={{
        marginBottom: '2rem',
        padding: '1rem',
        boxShadow: '0 2px 2px 2px rgba(0,0,0,0.25)',
        borderRadius: '5px',
      }}
    >
      <h2>
        {transaction.pk}#{transaction.sort}
      </h2>
      <h3>{transaction.status}</h3>
      <p>amount: {transaction.charge.amount}</p>
      <p>created: {new Date(transaction.charge.created).toISOString()}</p>
    </div>
  );
}
