const express = require('express');
const authenticated = require('../middlewares/authenticated');
const mapUser = require('../helpers/mapUser');
const { updateUser } = require('../controllers/user');

const router = express.Router({ mergeParams: true });

router.patch('/', authenticated, async (req, res) => {
  try {
    console.log('userPATCH', req.body);
    console.log('user', req.user);

    // TODO доделать функционал изменения данных пользователя
    // const { user, token } = await updateUser(req.user, req.body);

    await updateUser(req.user, req.body);

    // const { user, token } = await register(req.body.login, req.body.password);

    // res
    //   .cookie('token', token, { httpOnly: true })
    //   .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error' });
  }
});

module.exports = router;
