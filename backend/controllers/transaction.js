const Transaction = require('../models/Transaction');
const createFindOptions = require('../helpers/createFindOptions');
const updateAccountBalance = require('../helpers/updateAccountBalance');
const { TYPE_CATEGORY } = require('../constants/typeCategory');

// add
async function addTransaction(transaction) {
  const newTransaction = await Transaction.create(transaction);

  await updateAccountBalance({
    id: transaction.account,
    type: transaction.type,
    amount: transaction.amount,
  });

  return { newTransaction };
}

// edit
async function editTransaction(id, transaction) {
  const oldTransaction = await Transaction.findByIdAndUpdate(id, transaction);

  if (!oldTransaction) {
    return { message: 'Операция не найдена' };
  }

  const oldType = oldTransaction.type;
  const oldAmount = oldTransaction.amount;
  const oldAccount = oldTransaction.account;

  if (oldAccount !== transaction.account) {
    // Восстанавливаем баланс старого счёта если изменился счёт в операции
    await updateAccountBalance({
      id: oldAccount,
      oldType,
      type:
        oldType === TYPE_CATEGORY.INCOME
          ? TYPE_CATEGORY.EXPENSE
          : TYPE_CATEGORY.INCOME,
      oldAmount,
      amount: 0,
    });

    // Обновляем баланс счёта на который был изменен в операции
    await updateAccountBalance({
      id: transaction.account,
      type: transaction.type,
      amount: transaction.amount,
    });
  } else {
    await updateAccountBalance({
      id: transaction.account,
      oldType,
      type: transaction.type,
      oldAmount,
      amount: transaction.amount,
    });
  }

  return { oldTransaction };
}

// delete
async function deleteTransaction(id) {
  const transaction = await Transaction.findById(id).exec();

  const { account, type, amount } = transaction;

  // Восстанавливаем баланс счёта
  await updateAccountBalance({
    id: account,
    oldType: type,
    type:
      type === TYPE_CATEGORY.INCOME
        ? TYPE_CATEGORY.EXPENSE
        : TYPE_CATEGORY.INCOME,
    oldAmount: amount,
    amount: 0,
  });

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
