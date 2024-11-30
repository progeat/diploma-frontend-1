module.exports = function (transaction) {
  return {
    id: transaction.id,
    accountId: transaction.account_id,
    categoryId: transaction.category_id,
    amount: transaction.amount,
    comment: transaction.comment,
    createdAt: transaction.createdAt,
  };
};
