const express = require('express');
const {
  getTransactions,
  getTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
} = require('../controllers/transaction');
const authenticated = require('../middlewares/authenticated.js');
const hasRole = require('../middlewares/hasRole');
const mapTransaction = require('../helpers/mapTransaction');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { transactions, lastPage } = await getTransactions(
    req.query.search,
    req.query.limit,
    req.query.page
  );

  res.send({
    data: { lastPage, transactions: transactions.map(mapTransaction) },
  });
});

router.get('/:id', async (req, res) => {
  const transaction = await getTransaction(req.params.id);

  res.send({ data: mapTransaction(transaction) });
});

// TODO продолжить отсюда
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
  const newTransaction = await addTransaction({
    account_id: req.body.accountId,
    category_id: req.body.categoryId,
    amount: req.body.amount,
    comment: req.body.comment,
    // comments: transaction.comments.map((comment) =>
    //   mongoose.isObjectIdOrHexString(comment) ? comment : mapAccount(comment)
    // ),
  });

  res.send({ data: mapTransaction(newTransaction) });
});

router.patch('/:id', authenticated, hasRole([ROLES.USER]), async (req, res) => {
  const updatedTransaction = await editTransaction(req.params.id, {
    account_id: req.body.accountId,
    category_id: req.body.categoryId,
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
