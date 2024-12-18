const Transaction = require('../models/Transaction');
const createFindOptions = require('../helpers/createFindOptions');

// add
async function addTransaction(transaction) {
  const newTransaction = await Transaction.create(transaction);

  return newTransaction;
}

// edit
async function editTransaction(id, transaction) {
  const newTransaction = await Transaction.findByIdAndUpdate(id, transaction, {
    returnDocument: 'after',
  });

  return newTransaction;
}

// delete
function deleteTransaction(id) {
  return Transaction.deleteOne({ _id: id });
}

// get list with search, filters and pagination
async function getTransactions(
  search = '',
  limit = 10,
  page = 1,
  dateStart,
  dateEnd,
  accountId,
  categoryId
) {
  const [transactions, count] = await Promise.all([
    Transaction.find({
      $and: createFindOptions({
        search,
        dateStart,
        dateEnd,
        accountId,
        categoryId,
      }),
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .populate('category')
      .populate('account'),

    Transaction.countDocuments({
      $and: createFindOptions({
        search,
        dateStart,
        dateEnd,
        accountId,
        categoryId,
      }),
    }),
  ]);

  return {
    transactions,
    lastPage: Math.ceil(count / limit) || 1,
  };
}

function getTransactionsForPeriod(period) {
  console.log(period);

  return Transaction.find({
    createdAt: {
      $gte: new Date().setDate(new Date().getMonth() - period),
      $lte: '',
    },
  });
}

// get item
function getTransaction(id) {
  return Transaction.findById(id);
}

module.exports = {
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransactions,
  getTransactionsForPeriod,
  getTransaction,
};
