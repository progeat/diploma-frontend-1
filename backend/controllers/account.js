const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

// add
async function addAccount(account) {
  const newAccount = await Account.create(account);

  return newAccount;
}

// edit
async function editAccount(id, account) {
  const newAccount = await Account.findByIdAndUpdate(id, account, {
    returnDocument: 'after',
  });

  return newAccount;
}

// delete
async function deleteAccount(id) {
  await Transaction.deleteMany({ account: id });

  return Account.deleteOne({ _id: id });
}

// get list with search and pagination
async function getAccounts() {
  const accounts = await Account.find();

  return accounts.sort((a, b) => b.balance - a.balance);
}

// get item
function getAccount(id) {
  return Account.findById(id);
}

module.exports = {
  addAccount,
  editAccount,
  deleteAccount,
  getAccounts,
  getAccount,
};
