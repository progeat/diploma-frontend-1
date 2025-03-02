import { ICON_OPTIONS } from '../../constants';

export const getIconCategoryEditedOption = (category) =>
	ICON_OPTIONS.find((option) => option.value === category?.icon);
