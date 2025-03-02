const express = require('express');
const { getStatisticsForPeriod } = require('../controllers/statistics.js');
const authenticated = require('../middlewares/authenticated.js');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, async (req, res) => {
  try {
    const statisticsTransactions = await getStatisticsForPeriod(
      req.user.id,
      req.query.period
    );

    res.send({ error: null, data: statisticsTransactions });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error' });
  }
});

module.exports = router;
