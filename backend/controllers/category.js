const Category = require('../models/Category');

// add
async function addCategory(category) {
  const newCategory = await Category.create(category);

  // TODO добавлять id счета

  // await newTransaction.populate({
  //   path: 'comments',
  //   populate: 'author',
  // });

  return newCategory;
}

// edit
async function editCategory(id, category) {
  const newCategory = await Category.findByIdAndUpdate(id, category, {
    returnDocument: 'after',
  });

  // TODO добавлять id счёта или имя счёта

  // await newPost.populate({
  //   path: 'comments',
  //   populate: 'author',
  // });

  return newCategory;
}

// delete
function deleteCategory(id) {
  return Category.deleteOne({ _id: id });
}

// get list with search and pagination
async function getCategories() {
  return Category.find();
}

// get item
function getCategory(id) {
  return Category.findById(id);

  // TODO подмешивать название счёта

  // .populate({
  //   path: 'comments',
  //   populate: 'author',
  // });
}

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
  getCategories,
  getCategory,
};
