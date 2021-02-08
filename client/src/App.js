import React from 'react';
import Header from './components/Header.js';
import FormPopup from './components/FormPopup.js';
import SelectBox, { PERIODS } from './components/SelectBox.js';
import Summary from './components/Summary.js';
import TransactionList from './components/TransactionList.js';
import services from './services/transactionService.js';

export default function App() {
  // jan/2019 até dez/2021 (inclusive)
  const [period, setPeriod] = React.useState(PERIODS[0].value);
  const [transactions, setTransactions] = React.useState([]);
  const [showPopup, setShowPopup] = React.useState(false);
  const [transactionForEdit, setTransactionForEdit] = React.useState(false);

  const getData = (period) => {
    services
      .getPeriod(period)
      .then(({ data }) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error('Cannot retrive transactions data' + error);
      });
  };

  React.useEffect(() => {
    getData(period);
  }, [period]);

  const handleEditTransaction = (transaction) => {
    setTransactionForEdit(transaction);
    togglePopup();
  };

  // if toggle to false set transaction to false also
  const togglePopup = () => {
    if (showPopup) {
      setTransactionForEdit(false);
    }
    setShowPopup(!showPopup);
  };

  const handlePOSTClick = async (newTransaction) => {
    const { data } = await services.create(newTransaction);
    if (data) getData(period);
  };
  const handlePUTClick = async (id, newTransaction) => {
    const { data } = await services.update(id, newTransaction);
    if (data) getData(period);
  };
  const handleDELETEClick = async (id) => {
    const { data } = await services.remove(id);
    if (data) getData(period);
  };

  return (
    <div className={'container center'}>
      <Header>
        <h3>Desafio Final do Bootcamp Full Stack</h3>
        <h4>Controle Financeiro Pessoal</h4>
      </Header>
      <SelectBox
        period={period}
        onChange={(period) => {
          setPeriod(period);
        }}
      />
      <Summary transactions={transactions} />
      <div style={styles.flexRow}>
        <button className={'btn'} onClick={togglePopup}>
          + Novo Lancamento
        </button>
        <input type="text" />
      </div>
      <div>
        {showPopup ? (
          <FormPopup
            transaction={transactionForEdit}
            closePopup={togglePopup}
            onPostTransaction={handlePOSTClick}
            onPutTransaction={handlePUTClick}
          />
        ) : null}
      </div>
      <TransactionList
        transactions={transactions}
        onDelTransaction={handleDELETEClick}
        onEditTransaction={handleEditTransaction}
        togglePopup={togglePopup}
      />
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
