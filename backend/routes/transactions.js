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
const mapAccount = require('../helpers/mapAccount');
const ROLES = require('../constants/roles');
const mapTransaction = require('../helpers/mapTransaction.js');

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
router.post('/:id/comments', authenticated, async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  res.send({ data: mapComment(newComment) });
});

router.delete(
  '/:postId/comments/:commentId',
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);

    res.send({ error: null });
  }
);

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newPost = await addPost({
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  });

  res.send({ data: mapPost(newPost) });
});

router.patch(
  '/:id',
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedPost = await editPost(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      image: req.body.imageUrl,
    });

    res.send({ data: mapPost(updatedPost) });
  }
);

router.delete(
  '/:id',
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deletePost(req.params.id);

    res.send({ error: null });
  }
);

module.exports = router;
