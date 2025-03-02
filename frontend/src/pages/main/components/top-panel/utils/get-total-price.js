export const getTotalPrice = (array) => {
	if (!array) {
		return 0;
	}

	return array.reduce((acc, { total }) => acc + total, 0);
};
