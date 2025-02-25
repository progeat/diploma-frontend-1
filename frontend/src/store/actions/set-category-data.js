import { ACTION_TYPE } from './action-type';

export const setCategoryData = (category) => ({
	type: ACTION_TYPE.SET_CATEGORY_DATA,
	payload: category,
});
