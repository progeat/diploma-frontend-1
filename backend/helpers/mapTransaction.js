const mongoose = require('mongoose');
const mapAccount = require('./mapAccount');

module.exports = function (transaction) {
  return {
    id: transaction.id,
    accountId: transaction.account_id,
    categoryId: transaction.category_id,
    amount: transaction.amount,
    comment: transaction.comment,
    // comments: transaction.comments.map((comment) =>
    //   mongoose.isObjectIdOrHexString(comment) ? comment : mapAccount(comment)
    // ),
    createdAt: transaction.createdAt,
  };
};
