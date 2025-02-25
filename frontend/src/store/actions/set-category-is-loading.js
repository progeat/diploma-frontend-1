import { ACTION_TYPE } from './action-type';

export const setCategoryIsLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_CATEGORY_IS_LOADING,
	payload: isLoading,
});
