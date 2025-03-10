const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionAt: {
      type: Date,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
