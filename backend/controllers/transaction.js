const Transaction = require('../models/Transaction');
const createFindOptions = require('../helpers/createFindOptions');
const updateAccountBalance = require('../helpers/updateAccountBalance');
const { TYPE_CATEGORY } = require('../constants/typeCategory');

// add
async function addTransaction(transaction) {
  const newTransaction = await Transaction.create(transaction);

  const updatedAccount = await updateAccountBalance({
    id: transaction.account,
    type: transaction.type,
    amount: transaction.amount,
  });

  return { newTransaction, updatedAccount };
}

// edit
async function editTransaction(id, transaction) {
  const oldTransaction = await Transaction.findByIdAndUpdate(id, transaction, {
    new: true,
  });

  if (!editTransaction) {
    return { message: 'Операция не найдена' };
  }

  console.log('doc', oldTransaction._doc.amount);

  const oldType = oldTransaction.type;
  const oldAmount = oldTransaction.amount;

  // const diff = oldType === TYPE_CATEGORY.INCOME ? -oldAmount : +oldAmount;

  const updatedAccount = await updateAccountBalance({
    id: transaction.account,
    oldType,
    type: transaction.type,
    oldAmount,
    amount: transaction.amount,
  });

  return { oldTransaction, updatedAccount };
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
