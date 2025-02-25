import { ACTION_TYPE } from './action-type';

export const setCategoryError = (error) => ({
	type: ACTION_TYPE.SET_CATEGORY_ERROR,
	payload: error,
});
