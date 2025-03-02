export const createSelectorOptions = (arrayValues) => {
	if (!arrayValues) {
		return arrayValues;
	}

	return arrayValues.map((obj) => ({ value: obj.id, label: obj.name }));
};
