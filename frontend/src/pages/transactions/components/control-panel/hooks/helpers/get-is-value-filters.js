export const getIsValueFilter = (filters) =>
	filters.some((valueFilter) => valueFilter !== '');
