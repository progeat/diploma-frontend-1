export const getTotalPrice = (array) => {
	return array.reduce((acc, { total }) => acc + total, 0);
};
