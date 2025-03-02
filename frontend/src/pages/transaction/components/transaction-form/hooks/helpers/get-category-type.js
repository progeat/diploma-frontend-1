export const getCategoryType = (categories, categorySelected) =>
	categories.find((category) => category.id === categorySelected.value).type;
