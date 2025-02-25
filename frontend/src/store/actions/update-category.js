import { ACTION_TYPE } from './action-type';

export const updateCategory = (category) => ({
	type: ACTION_TYPE.UPDATE_CATEGORY,
	payload: category,
});
