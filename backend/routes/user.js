const express = require('express');
const authenticated = require('../middlewares/authenticated');
const mapUser = require('../helpers/mapUser');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, (req, res) => {
  const user = req.user;

  res.send({
    data: mapUser(user),
  });
});

module.exports = router;
