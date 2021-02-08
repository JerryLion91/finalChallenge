import React from 'react';

export default function Transaction({
  transaction,
  onDelTransaction,
  onEditTransaction,
}) {
  const { _id, description, value, category, type, day } = transaction;
  const handleEditClick = () => {
    onEditTransaction(transaction);
  };
  const handleDelClick = () => {
    onDelTransaction(_id);
  };

  return (
    <div
      style={{
        ...styles.flexRow,
        borderLeft: `8px solid ${type === '+' ? 'green' : 'red'}`,
      }}
    >
      <span>{day}</span>
      <div style={styles.description}>
        <span>{description}</span>
        <span>{category}</span>
      </div>
      <span>R${value},00</span>
      <button className={'btn'} onClick={handleEditClick}>
        Edit
      </button>
      <button className={'btn'} onClick={handleDelClick}>
        Del
      </button>
    </div>
  );
}

const styles = {
  flexRow: {
    border: '1px solid grey',
    borderRadius: '5px',
    height: '50px',
    margin: '20px',
    padding: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '400px',
    height: '50px',
  },
};
