import { ACTION_TYPE } from './action-type';

export const setAccountsIsLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_ACCOUNTS_IS_LOADING,
	payload: isLoading,
});
