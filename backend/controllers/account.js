const Account = require('../models/Account');

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

  // TODO добавлять id счёта или имя счёта

  // await newPost.populate({
  //   path: 'comments',
  //   populate: 'author',
  // });

  return newAccount;
}

// delete
function deleteAccount(id) {
  return Account.deleteOne({ _id: id });
}

// get list with search and pagination
async function getAccounts() {
  return Account.find();
}

// get item
function getAccount(id) {
  return Account.findById(id);

  // TODO подмешивать название счёта

  // .populate({
  //   path: 'comments',
  //   populate: 'author',
  // });
}

module.exports = {
  addAccount,
  editAccount,
  deleteAccount,
  getAccounts,
  getAccount,
};
