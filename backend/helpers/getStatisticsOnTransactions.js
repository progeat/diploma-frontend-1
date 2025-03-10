const Category = require('../models/Category');
const { TYPE_CATEGORY } = require('../constants/typeCategory');

module.exports = async function (transactions) {
  const categories = await Category.find();

  const statisticsOnTransactions = transactions.reduce(
    (acc, transaction) => {
      const category = categories.find(
        (category) => category.id === transaction.category.toString()
      );

      if (!category) return;

      if (category.type === TYPE_CATEGORY.EXPENSE) {
        if (acc.expenses?.[transaction.category]) {
          acc.expenses[transaction.category].count += 1;
          acc.expenses[transaction.category].total += transaction.amount;

          return acc;
        }

        acc.expenses[transaction.category] = {
          id: category.id,
          category: {
            name: category.name,
            icon: category.icon,
            color: category.color,
          },
          color: category.color,
          count: 1,
          total: transaction.amount,
        };

        return acc;
      } else {
        if (acc.income?.[transaction.category]) {
          acc.income[transaction.category].count += 1;
          acc.income[transaction.category].total += transaction.amount;

          return acc;
        }

        acc.income[transaction.category] = {
          id: category.id,
          category: {
            name: category.name,
            icon: category.icon,
            color: category.color,
          },
          color: category.color,
          count: 1,
          total: transaction.amount,
        };

        return acc;
      }
    },
    { expenses: {}, income: {} }
  );

  const expensesSort = Object.values(statisticsOnTransactions.expenses).sort(
    (a, b) => b.total - a.total
  );
  const incomeSort = Object.values(statisticsOnTransactions.income).sort(
    (a, b) => b.total - a.total
  );

  return {
    expenses: expensesSort,
    income: incomeSort,
  };
};
