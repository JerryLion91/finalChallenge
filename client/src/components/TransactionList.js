import React from 'react';
import Transaction from './Transaction';

export default function TransactionList({
  transactions,
  onDelTransaction,
  onEditTransaction,
}) {
  return (
    <div>
      {transactions
        .sort(function (a, b) {
          return a.description.localeCompare(b.description);
        })
        .sort(function (a, b) {
          return a.day - b.day;
        })
        .map((transaction) => {
          return (
            <Transaction
              key={transaction._id}
              transaction={transaction}
              onEditTransaction={onEditTransaction}
              onDelTransaction={onDelTransaction}
            />
          );
        })}
    </div>
  );
}
