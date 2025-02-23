import { ACTION_TYPE } from './action-type';

export const setCategoriesError = (error) => ({
	type: ACTION_TYPE.SET_CATEGORIES_ERROR,
	payload: error,
});
