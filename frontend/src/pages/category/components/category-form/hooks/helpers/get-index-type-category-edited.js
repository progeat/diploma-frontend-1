import { CATEGORY_TYPE_OPTIONS } from '../../constants';

export const getIndexTypeCategoryEdited = (category) => {
	let indexTypeCategoryEdited = CATEGORY_TYPE_OPTIONS.findIndex(
		(option) => option.value === category?.type,
	);

	if (indexTypeCategoryEdited < 0) {
		indexTypeCategoryEdited = 0;
	}

	return indexTypeCategoryEdited;
};
