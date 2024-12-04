const mapAccount = require('./mapAccount');
const mapCategory = require('./mapCategory');

module.exports = function (transaction) {
  return {
    id: transaction.id,
    account: mapAccount(transaction.account),
    category: mapCategory(transaction.category),
    amount: transaction.amount,
    comment: transaction.comment,
    createdAt: transaction.createdAt,
  };
};
