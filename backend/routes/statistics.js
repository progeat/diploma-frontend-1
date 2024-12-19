const express = require('express');
const { getStatisticsForPeriod } = require('../controllers/statistics.js');
const authenticated = require('../middlewares/authenticated.js');
const hasRole = require('../middlewares/hasRole.js');
const mapTransaction = require('../helpers/mapTransaction.js');
const ROLES = require('../constants/roles.js');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const statisticsTransactions = await getStatisticsForPeriod(
      req.query.period
    );

    res.send({ error: null, data: statisticsTransactions });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error' });
  }
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
