const express = require('express');
const {
  getCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
} = require('../controllers/category');
const authenticated = require('../middlewares/authenticated.js');
const hasRole = require('../middlewares/hasRole');
const mapCategory = require('../helpers/mapCategory');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const categories = await getCategories();

  res.send({
    data: categories.map(mapCategory),
  });
});

router.get('/:id', async (req, res) => {
  const category = await getCategory(req.params.id);

  res.send({ data: mapCategory(category) });
});

router.post('/', authenticated, hasRole([ROLES.USER]), async (req, res) => {
  const newCategory = await addCategory({
    name: req.body.name,
    type: req.body.type,
  });

  res.send({ data: mapCategory(newCategory) });
});

router.patch('/:id', authenticated, hasRole([ROLES.USER]), async (req, res) => {
  const updatedCategory = await editCategory(req.params.id, {
    name: req.body.name,
    type: req.body.type,
  });

  res.send({ data: mapCategory(updatedCategory) });
});

router.delete(
  '/:id',
  authenticated,
  hasRole([ROLES.USER]),
  async (req, res) => {
    await deleteCategory(req.params.id);

    res.send({ error: null });
  }
);

module.exports = router;
