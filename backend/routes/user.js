const express = require('express');
const authenticated = require('../middlewares/authenticated');
const mapUser = require('../helpers/mapUser');
const { updateUser } = require('../controllers/user');

const router = express.Router({ mergeParams: true });

// get
router.get('/', authenticated, (req, res) => {
  res.send({ error: null, user: mapUser(req.user) });
});

// edit
router.patch('/', authenticated, async (req, res) => {
  try {
    console.log('userPATCH', req.body);
    console.log('user', req.user);

    // TODO доделать функционал изменения данных пользователя (изменение пароля)

    const { user, token } = await updateUser(req.user, req.body);

    res
      .cookie('token', token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error' });
  }
});

module.exports = router;
