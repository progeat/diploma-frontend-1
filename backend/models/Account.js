const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
