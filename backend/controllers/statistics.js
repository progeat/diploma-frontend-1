const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const getStartPeriodDate = require('../helpers/getStartPeriodDate');
const getEndPeriodDate = require('../helpers/getEndPeriodDate');
const getStatisticsOnTransactions = require('../helpers/getStatisticsOnTransactions');

async function getStatisticsForPeriod(user, period = 1) {
  const startPeriodDate = getStartPeriodDate(period);
  const endPeriodDate = getEndPeriodDate(period);
  const userObjectId = new mongoose.Types.ObjectId(user);

  const transactions = await Transaction.find({
    $and: [
      { user: { $in: userObjectId } },
      {
        transactionAt: {
          $gte: startPeriodDate,
          $lte: endPeriodDate,
        },
      },
    ],
  });

  const statisticsOnTransactions = await getStatisticsOnTransactions(
    transactions
  );

  return statisticsOnTransactions;
}

module.exports = {
  getStatisticsForPeriod,
};
