const express = require('express');
const {
  getAccounts,
  getAccount,
  addAccount,
  editAccount,
  deleteAccount,
} = require('../controllers/account');
const authenticated = require('../middlewares/authenticated.js');
const hasRole = require('../middlewares/hasRole');
const mapAccount = require('../helpers/mapAccount');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const accounts = await getAccounts();

  res.send({
    data: accounts.map(mapAccount),
  });
});

router.get('/:id', async (req, res) => {
  const account = await getAccount(req.params.id);

  res.send({ data: mapAccount(account) });
});

router.post('/', authenticated, hasRole([ROLES.USER]), async (req, res) => {
  const newAccount = await addAccount({
    name: req.body.name,
    type: req.body.type,
    balance: req.body.balance,
  });

  res.send({ data: mapAccount(newAccount) });
});

router.patch('/:id', authenticated, hasRole([ROLES.USER]), async (req, res) => {
  const updatedAccount = await editAccount(req.params.id, {
    name: req.body.name,
    type: req.body.type,
    balance: req.body.balance,
  });

  res.send({ data: mapAccount(updatedAccount) });
});

router.delete(
  '/:id',
  authenticated,
  hasRole([ROLES.USER]),
  async (req, res) => {
    await deleteAccount(req.params.id);

    res.send({ error: null });
  }
);

module.exports = router;
