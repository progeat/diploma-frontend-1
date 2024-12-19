const Transaction = require('../models/Transaction');
const getStartPeriodDate = require('../helpers/getStartPeriodDate');
const getStatisticsOnTransactions = require('../helpers/getStatisticsOnTransactions');

async function getStatisticsForPeriod(period = 1) {
  const startPeriodDate = getStartPeriodDate(period);

  const transactions = await Transaction.find({
    createdAt: {
      $gte: startPeriodDate,
    },
  });

  const statisticsOnTransactions = await getStatisticsOnTransactions(
    transactions
  );

  return statisticsOnTransactions;
}

module.exports = {
  getStatisticsForPeriod,
};
