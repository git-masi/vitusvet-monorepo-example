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

    const fetchTransactions = async () => {
      try {
        const res = await fetch('http://localhost:3000/transactions');
        const json = await res.json();
        const data = TransactionsValidator.parse(json);

        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();

    didFetchRef.current = true;
  }, []);

  return (
    <section>
      <h1>Transactions</h1>
      {transactions.map((t) => (
        <Transaction key={`${t.pk}${t.sort}`} transaction={t} />
      ))}
    </section>
  );
}
