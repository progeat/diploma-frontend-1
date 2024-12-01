const Transaction = require('../models/Transaction');

// add
async function addTransaction(transaction) {
  const newTransaction = await Transaction.create(transaction);

  // TODO добавлять id счета

  // await newTransaction.populate({
  //   path: 'comments',
  //   populate: 'author',
  // });

  return newTransaction;
}

// edit
async function editTransaction(id, transaction) {
  const newTransaction = await Transaction.findByIdAndUpdate(id, transaction, {
    returnDocument: 'after',
  });

  // TODO добавлять id счёта или имя счёта

  // await newPost.populate({
  //   path: 'comments',
  //   populate: 'author',
  // });

  return newTransaction;
}

// delete
function deleteTransaction(id) {
  return Transaction.deleteOne({ _id: id });
}

// get list with search and pagination
async function getTransactions(search = '', limit = 10, page = 1) {
  const [transactions, count] = await Promise.all([
    // TODO сделать поиск по всем значениям
    Transaction.find({ comment: { $regex: search, $options: 'i' } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),

    // TODO сделать поиск по всем значениям
    Transaction.countDocuments({ comment: { $regex: search, $options: 'i' } }),
  ]);

  return {
    transactions,
    lastPage: Math.ceil(count / limit),
  };
}

// get item
function getTransaction(id) {
  return Transaction.findById(id);

  // TODO подмешивать название счёта

  // .populate({
  //   path: 'comments',
  //   populate: 'author',
  // });
}

module.exports = {
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransactions,
  getTransaction,
};
