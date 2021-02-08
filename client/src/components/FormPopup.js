import React from 'react';

export default function FormPopup({
  closePopup,
  transaction,
  onPostTransaction,
  onPutTransaction,
}) {
  const [description, setDescription] = React.useState(
    transaction.description || ''
  );
  const [category, setCategory] = React.useState(transaction.category || '');
  const [value, setValue] = React.useState(transaction.value || 0);
  const [year, setYear] = React.useState(transaction.year || 2019);
  const [month, setMonth] = React.useState(transaction.month || 1);
  const [day, setDay] = React.useState(transaction.day || 1);
  const [type, setType] = React.useState(transaction.type || '+');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTransaction = {
      description,
      value,
      category,
      year,
      month,
      day,
      type,
    };
    if (transaction) {
      const { _id } = transaction;
      onPutTransaction(_id, newTransaction);
    } else {
      onPostTransaction(newTransaction);
    }
    closePopup();
  };

  return (
    <div className="popup">
      <form
        onSubmit={handleSubmit}
        className="popup\_inner"
        style={{ background: 'white', padding: '50px', margin: '20vh 30vw' }}
      >
        <div>
          <label>
            <input
              className="with-gap"
              name="group3"
              type="radio"
              checked={type === '-'}
              onChange={({ target }) => {
                if (target.checked) setType('-');
              }}
              disabled={transaction}
              />
            <span>Despesa</span>
          </label>
          <label>
            <input
              className="with-gap"
              name="group3"
              type="radio"
              checked={type === '+'}
              onChange={({ target }) => {
                if (target.checked) setType('+');
              }}
              disabled={transaction}
            />
            <span>Receita</span>
          </label>
        </div>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={({ target }) => {
              setDescription(target.value);
            }}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={({ target }) => {
              setCategory(target.value);
            }}
          />
        </label>
        <label>
          Value:
          <input
            type="Number"
            value={value}
            onChange={({ target }) => {
              setValue(target.value);
            }}
          />
        </label>
        <div>
          <label>
            Year:
            <input
              type="Number"
              value={year}
              onChange={({ target }) => {
                setYear(target.value);
              }}
            />
          </label>
          <label>
            Month:
            <input
              type="Number"
              value={month}
              onChange={({ target }) => {
                setMonth(target.value);
              }}
            />
          </label>
          <label>
            Day:
            <input
              type="Number"
              value={day}
              onChange={({ target }) => {
                setDay(target.value);
              }}
            />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
