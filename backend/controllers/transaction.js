const Transaction = require('../models/Transaction');

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

// get list with search and pagination
async function getTransactions(
  search = '',
  limit = 10,
  page = 1,
  dateStart,
  dateEnd
) {
  const [transactions, count] = await Promise.all([
    // TODO сделать поиск по всем значениям
    Transaction.find({
      $and: [
        { comment: { $regex: search, $options: 'i' } },
        {
          createdAt: {
            $gte: dateStart,
            $lte: dateEnd,
          },
        },
      ],
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .populate('category')
      .populate('account'),

    // TODO сделать поиск по всем значениям
    Transaction.countDocuments({
      $and: [
        { comment: { $regex: search, $options: 'i' } },
        {
          createdAt: {
            $gte: dateStart,
            $lte: dateEnd,
          },
        },
      ],
    }),
  ]);

  return {
    transactions,
    lastPage: Math.ceil(count / limit),
  };
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
  getTransaction,
};
