const express = require('express');
const transactionRouter = express.Router();
const TransactionModel = require('../models/TransactionModel');

module.exports = transactionRouter;
// route to get all from period
transactionRouter.get('/', getPeriod);
// route to create a new transaction
transactionRouter.post('/', create);
// route to update a transaction
transactionRouter.put('/:id', update);
// route delete a transaction
transactionRouter.delete('/:id', remove);

// jan/2019 até dez/2021 (inclusive)
async function getPeriod(req, res) {
  const regex = new RegExp(/^\d\d\d\d-\d\d$/);
  try {
    if (!regex.test(req.query.period)) {
      throw new Error(
        'E necessario informar o parametro "period", cujo valor deve estar no formato yyyy-mm'
      );
    }
    const filter = {
      yearMonth: req.query.period,
    };
    const result = await TransactionModel.find(filter);
    res.send(result);
    console.log(`GET / - ${JSON.stringify(req.query.period)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu em recuperar' });
    console.log(`GET / - ${JSON.stringify(error.message)}`);
  }
}

async function create(req, res) {
  const { description, value, category, year, month, day, type } = req.body;
  const transactionDate = new Date(year, month, day);
  const yearMonth = dateToyearMonth(transactionDate);
  const yearMonthDay = dateToyearMonthDay(transactionDate);
  const transaction = new TransactionModel({
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  });
  try {
    const result = await transaction.save(transaction);
    res.send({
      message: 'Transaction inserted with sucess',
      newTransaction: result,
    });
    console.log(`POST / - ${JSON.stringify(result)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    console.log(`POST / - ${JSON.stringify(error.message)}`);
  }
}

async function update(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }
  const id = req.params.id;

  const { description, value, category, year, month, day, type } = req.body;
  const transactionDate = new Date(year, month, day);
  const yearMonth = dateToyearMonth(transactionDate);
  const yearMonthDay = dateToyearMonthDay(transactionDate);
  const transaction = {
    _id: id,
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  };

  try {
    const result = await TransactionModel.findByIdAndUpdate(id, transaction, {
      new: true,
      useFindAndModify: false,
    });
    res.send({
      message: 'Transaction updated with sucess',
      newTransaction: result,
    });
    console.log(`PUT /${id} - ${JSON.stringify(result)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao atualizar' });
    console.log(`PUT /${id} - ${JSON.stringify(error.message)}`);
  }
}

async function remove(req, res) {
  try {
    const id = req.params.id;
    const result = await TransactionModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).send({
        message: 'Transaction Id not found',
      });
    }
    res.send({
      message: 'Transaction deleted with sucess',
      result: result,
    });
    console.log(`DELETE /${id} - ${JSON.stringify(result)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao remover' });
    console.log(`DELETE /${id} - ${JSON.stringify(error.message)}`);
  }
}

/**
 * helper functions
 */
function addZero(numero) {
  return numero <= 9 ? `0${numero}` : numero;
}
function dateToyearMonthDay(dateToFormat) {
  return `${dateToFormat.getFullYear()}-${addZero(
    dateToFormat.getMonth()
  ).toString()}-${addZero(dateToFormat.getDate()).toString()}`;
}
function dateToyearMonth(dateToFormat) {
  return `${dateToFormat.getFullYear()}-${addZero(
    dateToFormat.getMonth()
  ).toString()}`;
}
