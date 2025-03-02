export const findOptionSelect = (value, options) => {
	if (value !== '') {
		return options.find((option) => option.value === value);
	}

	return null;
};
