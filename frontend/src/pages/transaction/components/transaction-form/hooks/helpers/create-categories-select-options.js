import { TYPE_CATEGORY } from '../../../../../../constants';

export const createCategoriesSelectOptions = (arrayValues, index) =>
	arrayValues.reduce((acc, obj) => {
		if (index === 1 && obj.type === TYPE_CATEGORY.INCOME) {
			acc.push({ value: obj.id, label: obj.name });
		} else if (index === 0 && obj.type === TYPE_CATEGORY.EXPENSE) {
			acc.push({ value: obj.id, label: obj.name });
		}

		return acc;
	}, []);
