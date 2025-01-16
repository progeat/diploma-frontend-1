const express = require('express');
const {
  getTransactions,
  getTransactionsForPeriod,
  getTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
} = require('../controllers/transaction');
const authenticated = require('../middlewares/authenticated.js');
const hasRole = require('../middlewares/hasRole');
const mapTransaction = require('../helpers/mapTransaction');
const mapAccount = require('../helpers/mapAccount');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { transactions, lastPage } = await getTransactions(
    req.query.search,
    req.query.limit,
    req.query.page,
    req.query.dateStart || new Date(0),
    req.query.dateEnd || new Date(),
    req.query.account || '',
    req.query.category || ''
  );

  res.send({
    data: { lastPage, transactions: transactions.map(mapTransaction) },
  });
});

router.get('/:id', async (req, res) => {
  const transaction = await getTransaction(req.params.id);

  res.send({ data: mapTransaction(transaction) });
});

router.get('/period', async (req, res) => {
  console.log('get period', req.query.period);
  // const { transactions } = await getTransactionsForPeriod(req.query.period);

  // res.send({
  //   data: transactions.map(mapTransaction),
  // });
});

// router.post('/:id/comments', authenticated, async (req, res) => {
//   const newComment = await addComment(req.params.id, {
//     content: req.body.content,
//     author: req.user.id,
//   });

//   res.send({ data: mapComment(newComment) });
// });

// router.delete(
//   '/:postId/comments/:commentId',
//   authenticated,
//   hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
//   async (req, res) => {
//     await deleteComment(req.params.postId, req.params.commentId);

//     res.send({ error: null });
//   }
// );

router.post('/', authenticated, hasRole([ROLES.USER]), async (req, res) => {
  // TODO подправить правильность логики и вывода операции и баланса
  const newTransaction = await addTransaction({
    type: req.body.type,
    account: req.body.account,
    category: req.body.category,
    amount: req.body.amount,
    comment: req.body.comment,
  });

  res.send({
    data: {
      newTransaction: mapTransaction(newTransaction.newTransaction),
      updatedAccount: mapAccount(newTransaction.updatedAccount),
    },
  });
});

router.patch('/:id', authenticated, hasRole([ROLES.USER]), async (req, res) => {
  const updatedTransaction = await editTransaction(req.params.id, {
    account: req.body.account,
    category: req.body.category,
    amount: req.body.amount,
    comment: req.body.comment,
  });

  res.send({ data: mapTransaction(updatedTransaction) });
});

router.delete(
  '/:id',
  authenticated,
  hasRole([ROLES.USER]),
  async (req, res) => {
    await deleteTransaction(req.params.id);

    res.send({ error: null });
  }
);

module.exports = router;
