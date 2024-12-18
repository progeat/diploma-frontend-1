const Transaction = require('../models/Transaction');

function getTransactionsForPeriod(period) {
  console.log(period);

  return Transaction.find({
    createdAt: {
      $gte: new Date().setDate(new Date().getMonth() - period),
      $lte: '',
    },
  });
}

module.exports = {
  getTransactionsForPeriod,
};
