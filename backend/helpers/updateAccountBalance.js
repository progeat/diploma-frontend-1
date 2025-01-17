const Account = require('../models/Account');
const { TYPE_CATEGORY } = require('../constants/typeCategory');

module.exports = async function ({
  id,
  type,
  amount,
  oldType = null,
  oldAmount = 0,
}) {
  const account = await Account.findById(id);

  switch (oldType) {
    case oldType === TYPE_CATEGORY.INCOME: {
      if (oldType !== type) {
        account.balance -= oldAmount + amount;
      } else {
        account.balance = account.balance - oldAmount + amount;
      }
      break;
    }
    case oldType === TYPE_CATEGORY.EXPENSE: {
      if (oldType !== type) {
        account.balance += oldAmount + amount;
      } else {
        account.balance = account.balance + oldAmount - amount;
      }
      break;
    }
    default:
      if (type === TYPE_CATEGORY.INCOME) {
        account.balance += amount;
      } else if (type === TYPE_CATEGORY.EXPENSE) {
        account.balance -= amount;
      }
      break;
  }

  await account.save();

  return account;
};
