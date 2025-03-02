import { ACTION_TYPE } from './action-type';

export const setCategoriesIsLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_CATEGORIES_IS_LOADING,
	payload: isLoading,
});
