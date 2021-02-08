import React from 'react';

export default function Summary({ transactions }) {
  const lancamentos = transactions.length;
  const receitas = transactions
    .filter((transaction) => transaction.type === '+')
    .reduce((acc, transaction) => {
      return acc + transaction.value;
    }, 0);
  const despesas = transactions
    .filter((transaction) => transaction.type === '-')
    .reduce((acc, transaction) => {
      return acc + transaction.value;
    }, 0);
  const saldo = receitas - despesas;

  return (
    <div style={styles.flexRow}>
      <span>Lancamentos: {lancamentos}</span>
      <span>Receitas: R${receitas},00</span>
      <span>Despesas: R${despesas},00</span>
      <span>Saldo: R${saldo},00</span>
    </div>
  );
}

const styles = {
  flexRow: {
    margin: '20px',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
};
