module.exports = function (category) {
  return {
    id: category.id,
    name: category.name,
    type: category.type,
    createdAt: category.createdAt,
  };
};
