import { ACTION_TYPE } from './action-type';

export const setAccountIsLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_ACCOUNT_IS_LOADING,
	payload: isLoading,
});
