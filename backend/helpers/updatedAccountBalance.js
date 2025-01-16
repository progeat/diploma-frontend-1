const Account = require('../models/Account');
const { TYPE_CATEGORY } = require('../constants/typeCategory');

module.exports = async function (id, type, amount) {
  const account = await Account.findById(id);

  if (type === TYPE_CATEGORY.INCOME) {
    account.balance += amount;
  } else if (type === TYPE_CATEGORY.EXPENSE) {
    account.balance -= amount;
  }

  await account.save();

  return account;
};
