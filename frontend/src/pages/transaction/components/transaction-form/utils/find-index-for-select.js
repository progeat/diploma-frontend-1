// TODO найти где ещё можно использовать и сделать общей утилитой(categoryForm)
export const findIndexForSelect = (id, options) =>
	options.findIndex((option) => option.value === id);
