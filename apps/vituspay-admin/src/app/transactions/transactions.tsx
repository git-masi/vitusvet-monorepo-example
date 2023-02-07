import { useEffect, useRef, useState } from 'react';
import { Transaction } from './transaction';
import {
  Transactions as TransactionsValidator,
  TransactionsType,
} from '@vitusvet/vituspay-types';

export function Transactions() {
  const [transactions, setTransactions] = useState<TransactionsType>([]);
  const didFetchRef = useRef(false);

  useEffect(() => {
    if (didFetchRef.current) return;

    (async () => {
      const res = await fetch('http://localhost:3000/transactions');
      const data = await TransactionsValidator.safeParseAsync(res.json());

      if (data.success) {
        setTransactions(data.data);
      }

      didFetchRef.current = true;
    })();
  }, []);

  return (
    <section>
      <h1>Transactions</h1>
      {transactions.map((t) => (
        <Transaction transaction={t} />
      ))}
    </section>
  );
}
