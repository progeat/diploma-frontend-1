const express = require('express');
const { getTransactionsForPeriod } = require('../controllers/statistics.js');
const authenticated = require('../middlewares/authenticated.js');
const hasRole = require('../middlewares/hasRole.js');
const mapTransaction = require('../helpers/mapTransaction.js');
const ROLES = require('../constants/roles.js');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  console.log('get period', req.query.period);
  const { transactions } = await getTransactionsForPeriod(req.query.period);

  console.log(transactions);
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

module.exports = router;
